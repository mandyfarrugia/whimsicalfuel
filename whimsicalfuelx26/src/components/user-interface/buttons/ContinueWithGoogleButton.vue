<template>
    <div ref="googleButton"></div>
</template>
<script setup>
    import { onMounted, ref } from 'vue';
    import { useAuthenticationStore } from '../../../stores/authenticationStore';

    const emit = defineEmits(['google-login-id-token']);

    const googleButton = ref(null);
    const authenticationStore = useAuthenticationStore();

    onMounted(() => {
        window.google.accounts.id.initialize({
            client_id: '320875031498-9djdthf86ghf6jh56gmdcc88bfdi2gt6.apps.googleusercontent.com',
            callback: handleGoogleResponse
        });

        window.google.accounts.id.renderButton(
            googleButton.value,
            {
                theme: 'outline',
                size: 'large',
                shape: 'pill',
                text: 'continue_with',
                width: 400
            }
        )
    });

    async function handleGoogleResponse(response) {
        emit('google-login-id-token', response.credential);
    }
</script>