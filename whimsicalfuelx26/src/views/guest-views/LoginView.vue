<script setup>
    import ReusableForm from '../../components/user-interface/forms/ReusableForm.vue';
    import ContinueWithGoogleButton from '../../components/user-interface/buttons/ContinueWithGoogleButton.vue';
    import { ref } from 'vue';
    import { useAuthenticationStore } from '../../stores/authenticationStore.js';

    const authenticationStore = useAuthenticationStore();
    const errorMessage = ref('');

    async function loginWithGoogle(idToken) {
        try {
            errorMessage.value = '';
            await authenticationStore.loginWithGoogleCredentials(idToken)
        } catch(error) {
            console.error(error);
            errorMessage.value = authenticationStore.errorMessage || 'Google login failed!';
        }
    }
</script>
<template>
    <div class="w-100 pa-4">
        <ReusableForm
            title="Login"
            subtitle="Get back on track with your health journey!"
            button-text="Login"
            @submit="onSubmit">
            <template #form-content>
                <v-text-field label="Email" density="comfortable" variant="outlined"></v-text-field>
                <v-text-field type="password" label="Password" density="comfortable" variant="outlined"></v-text-field>
            </template>
            <template #actions>
                <div class="d-flex justify-center">
                    <ContinueWithGoogleButton @google-login-id-token="loginWithGoogle"></ContinueWithGoogleButton>
                </div>
            </template>
        </ReusableForm>
    </div>
</template>