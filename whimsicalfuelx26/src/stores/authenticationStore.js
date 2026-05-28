import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { firebaseAuthentication } from "../firebase/firebase";

export const useAuthenticationStore = defineStore('authentication', () => {
    const user = ref(null);
    const isLoading = ref(false);
    const errorMessage = ref('');

    const isAuthenticated = computed(() => !!user.value);

    function initialiseAuthenticationListener() {
        onAuthStateChanged(firebaseAuthentication, (currentUser) => {
            user.value = currentUser;
            isLoading.value = false;
        });
    };

    async function loginWithGoogleCredentials(idToken) {
        try {
            errorMessage.value = '';
            const credential = GoogleAuthProvider.credential(idToken);
            const result = await signInWithCredential(firebaseAuthentication, credential);
            user.value = result.user;
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
            user.value = null;
        } catch(error) {
            console.error(error);
            errorMessage.value = 'Logout failed!';
            throw error;
        }
    }

    return { user, isLoading, errorMessage, isAuthenticated, initialiseAuthenticationListener, loginWithGoogleCredentials, logout };
});