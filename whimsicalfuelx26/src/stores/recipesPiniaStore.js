import { defineStore } from 'pinia';
import { ref } from 'vue';
import { firebaseDatabase, firebaseStorage } from '../firebase/firebase';
import { addDoc, collection, onSnapshot, Timestamp, updateDoc, doc, setDoc, serverTimestamp, getDoc, deleteDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { mealPeriods } from '../data/mealPeriods';

export const useRecipesPiniaStore = defineStore('recipes', () => {
    const recipes = ref([]);
    let unsubscribe = null;

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

    const addNewRecipe = async (payload) => {
        try {
            let uploadedVideoUrl = '';
            let uploadedVideoPath = '';

            if(payload.attachments.videoSourceType === 'upload') {
                const videoFile = payload.attachments.uploadedVideoFile;
                uploadedVideoPath = `recipe-videos/${Date.now()}-${videoFile.name}`;
                const videoStorageReference = storageRef(firebaseStorage, uploadedVideoPath);
                await uploadBytes(videoStorageReference, videoFile);
                uploadedVideoUrl = await getDownloadURL(videoStorageReference);
            }

            const recipeToUploadToFirestore = {
                title: payload.title,
                calories: payload.calories,
                mealPeriods: payload.mealPeriods,
                servings: payload.servings,
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
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            await addDoc(collection(firebaseDatabase, 'recipes'), recipeToUploadToFirestore);
        } catch(error) {
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

    return { recipes, fetchRecipes, addNewRecipe, stopFetchingRecipes }
});