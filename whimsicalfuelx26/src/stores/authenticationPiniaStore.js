import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuthentication, firebaseDatabase, firebaseStorage } from "../firebase/firebase";
import { getDoc, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export const useAuthenticationPiniaStore = defineStore('authentication', () => {
    const userAccount = ref(null);
    const userProfile = ref(null);
    const isLoading = ref(true);
    const errorMessage = ref('');
    const isAuthenticationReady = ref(false);

    const isAuthenticated = computed(() => !!userAccount.value);

    const initialiseAuthenticationListener = () => {
        onAuthStateChanged(firebaseAuthentication, (currentUser) => {
            userAccount.value = currentUser;
            isLoading.value = false;
        });
    };

    const registerUser = async (payload) => {
        try {
            const newUserAccount = await createUserWithEmailAndPassword(firebaseAuthentication, payload.emailAddress, payload.password);
            const referenceToUsersDocument = doc(firebaseDatabase, 'users', newUserAccount.user.uid);

            let pathToProfilePicture = '';

            if(payload.profilePicture) {
                const fileUpload = Array.isArray(payload.profilePicture)
                    ? payload.profilePicture[0]
                    : payload.profilePicture;

                if (fileUpload) {
                    const safeFileName = fileUpload.name
                        .replace(/\s+/g, '-')
                        .toLowerCase();

                    const refToProfilePicture = storageRef(
                        firebaseStorage,
                        `profile-pictures/${newUserAccount.user.uid}/${Date.now()}_${safeFileName}`
                    );

                    await uploadBytes(refToProfilePicture, fileUpload);
                    pathToProfilePicture = await getDownloadURL(refToProfilePicture);
                }
            }
            
            const newUserProfile = {
                firstName: payload.firstName,
                lastName: payload.lastName,
                username: payload.username,
                dateOfBirth: payload.dateOfBirth,
                emailAddress: newUserAccount.user.email,
                profilePicture: pathToProfilePicture,
                role: 'User',
                createdAt: serverTimestamp()
            };
            
            await setDoc(referenceToUsersDocument, newUserProfile);
            const documentOfNewUserProfile = await getDoc(referenceToUsersDocument);

            userAccount.value = newUserAccount.user;
            userProfile.value = documentOfNewUserProfile.data();
        } catch(error) {
            console.error(`An error has occurred while attempting to register a new user: ${error}`);
            throw error;
        }
    }

    const authenticateUser = async (payload) => {
        try {
            const { emailAddress, password } = payload;
            const userToAuthenticate = await signInWithEmailAndPassword(firebaseAuthentication, emailAddress, password);
            userAccount.value = userToAuthenticate.user;
            await getUserProfileById(userToAuthenticate.user.uid);
        } catch(error) {
            console.error(`An error has occurred while attempting to authenticate user: ${error}`);
            throw error;
        }
    };

    const loginWithGoogleCredentials = async (idToken) => {
        try {
            errorMessage.value = '';

            const credential = GoogleAuthProvider.credential(idToken);

            const result = await signInWithCredential(
                firebaseAuthentication,
                credential
            );

            const googleUser = result.user;

            const userDocumentReference = doc(
                firebaseDatabase,
                'users',
                googleUser.uid
            );

            const userDocumentSnapshot = await getDoc(userDocumentReference);

            if (!userDocumentSnapshot.exists()) {
                const displayNameParts = googleUser.displayName
                    ? googleUser.displayName.split(' ')
                    : [];

                const firstName = displayNameParts[0] || '';
                const lastName = displayNameParts.slice(1).join(' ') || '';

                const generatedUsername = googleUser.email
                    ? googleUser.email.split('@')[0]
                    : `user-${googleUser.uid.substring(0, 6)}`;

                const newGoogleUserProfile = {
                    firstName: firstName,
                    lastName: lastName,
                    username: generatedUsername,
                    dateOfBirth: null,
                    emailAddress: googleUser.email,
                    profilePicture: googleUser.photoURL || '',
                    role: 'User',
                    createdAt: serverTimestamp()
                };

                await setDoc(userDocumentReference, newGoogleUserProfile);

                userProfile.value = newGoogleUserProfile;
            } else {
                userProfile.value = userDocumentSnapshot.data();
            }

            userAccount.value = googleUser;

            return googleUser;
        } catch(error) {
            console.error(error);
            errorMessage.value = 'Google login failed!';
            throw error;
        }
    };

    async function logout() {
        try {
            errorMessage.value = '';
            await signOut(firebaseAuthentication);
            userAccount.value = null;
            userProfile.value = null;
        } catch(error) {
            console.error(error);
            errorMessage.value = 'Logout failed!';
            throw error;
        }
    }

    const getUserProfileById = async (userId) => {
        try {
            if(!userId) {
                throw new Error('User ID is required to fetch the user profile.');
            }

            const documentCorrespondingToUserById = doc(firebaseDatabase, 'users', userId);
            const snapshot = await getDoc(documentCorrespondingToUserById);

            if(snapshot.exists()) {
                userProfile.value = snapshot.data();
            } else {
                userProfile.value = null;
            }
        } catch(error) {
            console.error(`An error has occurred while fetching the user profile: ${error}`);
            userProfile.value = null;
            throw error;
        }
    }

    const trackAuthenticationState = () => {
        return onAuthStateChanged(firebaseAuthentication, async (authenticatedUser) => {
            try {
                userAccount.value = authenticatedUser;

                if(authenticatedUser) {
                    await getUserProfileById(authenticatedUser.uid);
                } else {
                    userProfile.value = null;
                }
            } finally {
                isAuthenticationReady.value = true;
            }
        });
    }

    return { userAccount, userProfile, isLoading, errorMessage, isAuthenticated, registerUser, authenticateUser, initialiseAuthenticationListener, loginWithGoogleCredentials, logout, getUserProfileById, trackAuthenticationState, isAuthenticationReady };
});