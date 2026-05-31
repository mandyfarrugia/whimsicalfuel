import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuthentication, firebaseDatabase } from "../firebase/firebase";
import { serverTimestamp, setDoc } from "firebase/firestore";

export const useAuthenticationPiniaStore = defineStore('authentication', () => {
    const userAccount = ref(null);
    const userProfile = ref(null);
    const isLoading = ref(true);
    const errorMessage = ref('');

    const isAuthenticated = computed(() => !!userAccount.value);

    const initialiseAuthenticationListener = () => {
        onAuthStateChanged(firebaseAuthentication, (currentUser) => {
            userAccount.value = currentUser;
            isLoading.value = false;
        });
    };

    const registerUser = async (payload) => {
        try {
            const newUserProfile = {
                firstName: payload.firstName,
                lastName: payload.lastName,
                username: payload.username,
                dateOfBirth: payload.dateOfBirth,
                role: 'user'
            };

            const newUserAccount = await createUserWithEmailAndPassword(firebaseAuthentication, payload.emailAddress, payload.password);
            await setDoc(doc(firebaseDatabase, 'users', newUserAccount.user.uid), {
                ...newUserProfile,
                emailAddress: newUserAccount.user.email,
                createdAt: serverTimestamp()
            });

            userAccount.value = newUserAccount;
            userProfile.value = newUserProfile;
        } catch(error) {
            console.error(`An error has occurred while attempting to register a new user: ${error}`);
            throw error;
        }
    }

    const authenticateUser = async (payload) => {
        try {
            const { emailAddress, password } = payload;
            const userToAuthenticate = await signInWithEmailAndPassword(firebaseAuthentication, emailAddress, password);
            userAccount.value = userToAuthenticate;
        } catch(error) {
            console.error(`An error has occurred while attempting to authenticate user: ${error}`);
            throw error;
        }
    };

    const loginWithGoogleCredentials = async (idToken) => {
        try {
            errorMessage.value = '';
            const credential = GoogleAuthProvider.credential(idToken);
            const result = await signInWithCredential(firebaseAuthentication, credential);
            userAccount.value = result.user;
            return result.user;
        } catch(error) {
            console.error(error);
            errorMessage.value = 'Google login failed!';
            throw error;
        }
    }

    async function logout() {
        try {
            errorMessage.value = '';
            await signOut(firebaseAuthentication);
            userAccount.value = null;
        } catch(error) {
            console.error(error);
            errorMessage.value = 'Logout failed!';
            throw error;
        }
    }

    return { userAccount, isLoading, errorMessage, isAuthenticated, initialiseAuthenticationListener, loginWithGoogleCredentials, logout };
});