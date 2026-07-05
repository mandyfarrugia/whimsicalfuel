import { defineStore } from 'pinia';
import { ref } from 'vue';
import { firebaseDatabase, firebaseStorage } from '../firebase/firebase';
import { addDoc, collection, onSnapshot, Timestamp, updateDoc, doc, setDoc, serverTimestamp, getDoc, deleteDoc, query, where } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { mealPeriods } from '../data/mealPeriods';
import { useAuthenticationPiniaStore } from './authenticationPiniaStore';

export const useRecipesPiniaStore = defineStore('recipes', () => {
    const recipes = ref([]);
    const pendingRecipes = ref([]);

    let unsubscribe = null;
    let pendingRecipesUnsubscribe = null;

    const authenticationPiniaStore = useAuthenticationPiniaStore();

    const fetchRecipes = async () => {
        try {
            const recipesFromCollection = collection(firebaseDatabase, 'recipes');
            unsubscribe = onSnapshot(recipesFromCollection,
                (snapshot) => {
                    recipes.value = snapshot.docs.map(document => ({
                        id: document.id,
                        ...document.data()
                    }));
                },
                (error) => {
                    console.error(`An error has occurred while attempting to fetch the recipes: ${error}`);
                }
            );
        } catch(error) {
            console.error(error);
            throw error;
        }
    };

    const getRecipeById = async (recipeId) => {
        try {
            const recipeDocumentReference = doc(firebaseDatabase, 'recipes', recipeId);
            const recipeDocumentSnapshot = await getDoc(recipeDocumentReference);

            if (!recipeDocumentSnapshot.exists()) {
                throw new Error('Recipe was not found!');
            }

            return {
                id: recipeDocumentSnapshot.id,
                ...recipeDocumentSnapshot.data()
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const isRecipesLoading = ref(false);

    const fetchApprovedRecipes = () => {
        try {
            isRecipesLoading.value = true;

            const recipesFromCollection = collection(firebaseDatabase, 'recipes');

            const approvedRecipesQuery = query(
                recipesFromCollection,
                where('isApproved', '==', true)
            );

            unsubscribe = onSnapshot(
                approvedRecipesQuery,
                (snapshot) => {
                    recipes.value = snapshot.docs.map((document) => ({
                        id: document.id,
                        ...document.data()
                    }));

                    isRecipesLoading.value = false;
                },
                (error) => {
                    console.error(`An error has occurred while attempting to fetch the recipes: ${error}`);
                    isRecipesLoading.value = false;
                }
            );
        } catch (error) {
            isRecipesLoading.value = false;
            console.error(error);
            throw error;
        }
    };

    const fetchPendingRecipes = () => {
        try {
            const recipesFromCollection = collection(firebaseDatabase, 'recipes');
            
            const pendingRecipesQuery = query(recipesFromCollection,
                where('approvalStatus', '==', 'Pending')
            );

            pendingRecipesUnsubscribe = onSnapshot(
                pendingRecipesQuery,
                (snapshot) => {
                    pendingRecipes.value = snapshot.docs.map((document) => ({
                        id: document.id,
                        ...document.data()
                    }));
                },
                (error) => {
                    console.error(`An error has occurred while attempting to fetch the recipes: ${error}`);
                }
            );
        } catch(error) {
            console.error(error);
            throw error;
        }
    };

    const getCurrentAdministratorId = async () => {
        const currentUserId = authenticationPiniaStore.userAccount?.uid;

        if (!currentUserId) {
            throw new Error('An authenticated user is required!');
        }

        const userDocumentReference = doc(firebaseDatabase, 'users', currentUserId);
        const userDocumentSnapshot = await getDoc(userDocumentReference);

        const currentUserProfile = userDocumentSnapshot.exists()
            ? userDocumentSnapshot.data()
            : null;

        if (currentUserProfile?.role !== 'Administrator') {
            throw new Error('Only administrators can perform this action!');
        }

        return currentUserId;
    };

    const approveRecipe = async (recipe) => {
        try {
            const currentUserId = await getCurrentAdministratorId();

            let uploadedVideoUrl = recipe.attachments?.uploadedVideoUrl || null;

            if (
                recipe.attachments?.videoSourceType === 'upload'
                && recipe.attachments?.uploadedVideoPath
                && !uploadedVideoUrl
            ) {
                const videoStorageReference = storageRef(
                    firebaseStorage,
                    recipe.attachments.uploadedVideoPath
                );

                uploadedVideoUrl = await getDownloadURL(videoStorageReference);
            }

            const recipeDocumentReference = doc(firebaseDatabase, 'recipes', recipe.id);

            await updateDoc(recipeDocumentReference, {
                isApproved: true,
                approvalStatus: 'Approved',
                approvedBy: currentUserId,
                approvedAt: serverTimestamp(),
                rejectedBy: null,
                rejectedAt: null,
                updatedAt: serverTimestamp(),
                'attachments.uploadedVideoUrl': uploadedVideoUrl
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const rejectRecipe = async (recipe) => {
        try {
            const currentUserId = await getCurrentAdministratorId();

            const recipeDocumentReference = doc(firebaseDatabase, 'recipes', recipe.id);

            await updateDoc(recipeDocumentReference, {
                isApproved: false,
                approvalStatus: 'Rejected',
                rejectedBy: currentUserId,
                rejectedAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const addNewRecipe = async (payload) => {
        try {
            const currentUserId = authenticationPiniaStore.userAccount?.uid;

            if(!currentUserId) {
                throw new Error('An authenticated user is required to create a recipe!');
            }

            let uploadedVideoUrl = '';
            let uploadedVideoPath = '';

            const recipeDocumentReference = doc(collection(firebaseDatabase, 'recipes'));
            const recipeId = recipeDocumentReference.id;

            if(payload.attachments.videoSourceType === 'upload') {
                const videoFile = payload.attachments.uploadedVideoFile;

                if(!videoFile) {
                    throw new Error('A video file was expected but was not provided!');
                }

                const safeFileName = videoFile.name.replace(/\s+/g, '-').toLowerCase();
                uploadedVideoPath = `recipe-videos/${currentUserId}/${recipeId}/${Date.now()}-${safeFileName}`;
                const videoStorageReference = storageRef(firebaseStorage, uploadedVideoPath);
                await uploadBytes(videoStorageReference, videoFile);
                uploadedVideoUrl = await getDownloadURL(videoStorageReference);
            }

            const userDocumentReference = doc(firebaseDatabase, 'users', currentUserId);
            const userDocumentSnapshot = await getDoc(userDocumentReference);

            const currentUserProfile = userDocumentSnapshot.exists()
                ? userDocumentSnapshot.data()
                : null;

            const isUserAdministrator = currentUserProfile?.role === 'Administrator';

            const recipeToUploadToFirestore = {
                title: payload.title,
                calories: payload.calories,
                servings: payload.servings,
                mealTypes: payload.mealTypes,
                mealPeriods: payload.mealPeriods,
                ingredients: payload.ingredients,
                recipe: payload.recipe,
                nutrientSources: payload.nutrientSources,
                attachments: {
                    videoSourceType: payload.attachments.videoSourceType || null,
                    videoLink: payload.attachments.videoLink || null,
                    uploadedVideoUrl: uploadedVideoUrl || null,
                    uploadedVideoPath: uploadedVideoPath || null
                },
                additionalRemarks: payload.additionalRemarks,
                isApproved: isUserAdministrator,
                approvalStatus: isUserAdministrator ? 'Approved' : 'Pending',
                createdBy: currentUserId,
                approvedBy: isUserAdministrator
                    ? currentUserId
                    : null,
                approvedAt: isUserAdministrator
                    ? serverTimestamp()
                    : null,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            await setDoc(recipeDocumentReference, recipeToUploadToFirestore);
        } catch(error) {
            console.error(error);
            throw error;
        }
    };

    const updateRecipe = async (recipeId, payload) => {
        try {
            const currentUserId = authenticationPiniaStore.userAccount?.uid;

            if (!currentUserId) {
                throw new Error('An authenticated user is required to update a recipe!');
            }

            const userDocumentReference = doc(firebaseDatabase, 'users', currentUserId);
            const userDocumentSnapshot = await getDoc(userDocumentReference);

            const currentUserProfile = userDocumentSnapshot.exists()
                ? userDocumentSnapshot.data()
                : null;

            const isUserAdministrator = currentUserProfile?.role === 'Administrator';

            const existingVideoSourceType =
                payload.attachments.existingVideoSourceType || null;

            const existingUploadedVideoUrl =
                payload.attachments.existingUploadedVideoUrl || null;

            const existingUploadedVideoPath =
                payload.attachments.existingUploadedVideoPath || null;

            const newVideoFile = payload.attachments.uploadedVideoFile || null;

            let finalVideoSourceType = payload.attachments.videoSourceType || null;
            let finalVideoLink = payload.attachments.videoLink || null;
            let finalUploadedVideoUrl = existingUploadedVideoUrl;
            let finalUploadedVideoPath = existingUploadedVideoPath;

            const hasExistingUploadedVideo =
                existingVideoSourceType === 'upload'
                && existingUploadedVideoPath;

            const hasNewUploadedVideo =
                finalVideoSourceType === 'upload'
                && newVideoFile;

            const isSwitchingFromUploadToLink =
                hasExistingUploadedVideo
                && finalVideoSourceType === 'link';

            const isReplacingUploadedVideo =
                hasExistingUploadedVideo
                && hasNewUploadedVideo;

            if (hasNewUploadedVideo) {
                const safeFileName = newVideoFile.name
                    .replace(/\s+/g, '-')
                    .toLowerCase();

                finalUploadedVideoPath =
                    `recipe-videos/${currentUserId}/${recipeId}/${Date.now()}-${safeFileName}`;

                const newVideoStorageReference = storageRef(
                    firebaseStorage,
                    finalUploadedVideoPath
                );

                await uploadBytes(newVideoStorageReference, newVideoFile);

                finalUploadedVideoUrl = isUserAdministrator
                    ? await getDownloadURL(newVideoStorageReference)
                    : null;

                finalVideoLink = null;
                finalVideoSourceType = 'upload';
            }

            if (isReplacingUploadedVideo || isSwitchingFromUploadToLink) {
                try {
                    const oldVideoStorageReference = storageRef(
                        firebaseStorage,
                        existingUploadedVideoPath
                    );

                    await deleteObject(oldVideoStorageReference);
                } catch (deleteError) {
                    console.warn('Old uploaded video could not be deleted:', deleteError);
                }
            }

            if (isSwitchingFromUploadToLink) {
                finalUploadedVideoUrl = null;
                finalUploadedVideoPath = null;
                finalVideoSourceType = 'link';
            }

            if (finalVideoSourceType === 'link') {
                finalUploadedVideoUrl = null;
                finalUploadedVideoPath = null;
            }

            const approvalFields = isUserAdministrator
                ? {
                    isApproved: true,
                    approvalStatus: 'Approved',
                    approvedBy: currentUserId,
                    approvedAt: serverTimestamp()
                }
                : {
                    isApproved: false,
                    approvalStatus: 'Pending',
                    approvedBy: null,
                    approvedAt: null
                };

            const recipeDocumentReference = doc(firebaseDatabase, 'recipes', recipeId);

            await updateDoc(recipeDocumentReference, {
                title: payload.title,
                calories: payload.calories,
                servings: payload.servings,
                mealTypes: payload.mealTypes,
                mealPeriods: payload.mealPeriods,
                ingredients: payload.ingredients,
                recipe: payload.recipe,
                nutrientSources: payload.nutrientSources,
                attachments: {
                    videoSourceType: finalVideoSourceType,
                    videoLink: finalVideoLink,
                    uploadedVideoUrl: finalUploadedVideoUrl || null,
                    uploadedVideoPath: finalUploadedVideoPath || null
                },
                additionalRemarks: payload.additionalRemarks || null,
                ...approvalFields,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const deleteRecipe = async (recipe) => {
        try {
            await getCurrentAdministratorId();

            const uploadedVideoPath = recipe.attachments?.uploadedVideoPath || null;

            if (uploadedVideoPath) {
                try {
                    const uploadedVideoStorageReference = storageRef(
                        firebaseStorage,
                        uploadedVideoPath
                    );

                    await deleteObject(uploadedVideoStorageReference);
                } catch (storageError) {
                    if (storageError.code !== 'storage/object-not-found') {
                        console.error('Uploaded recipe video could not be deleted:', storageError);
                        throw storageError;
                    }
                }
            }

            const recipeDocumentReference = doc(
                firebaseDatabase,
                'recipes',
                recipe.id
            );

            await deleteDoc(recipeDocumentReference);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const stopFetchingRecipes = async () => {
        if(unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }
    };

    const stopFetchingPendingRecipes = async () => {
        if(pendingRecipesUnsubscribe) {
            pendingRecipesUnsubscribe();
            pendingRecipesUnsubscribe = null;
        }
    };

    return { recipes, isRecipesLoading, pendingRecipes, fetchRecipes, getRecipeById, fetchApprovedRecipes, fetchPendingRecipes, approveRecipe, rejectRecipe, addNewRecipe, updateRecipe, deleteRecipe, stopFetchingRecipes, stopFetchingPendingRecipes }
});