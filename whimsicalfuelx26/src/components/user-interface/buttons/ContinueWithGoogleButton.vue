<template>
    <div class="d-flex justify-center">
        <v-progress-circular
            v-if="isGoogleButtonLoading"
            indeterminate
            size="24"/>
        <div v-show="!isGoogleButtonLoading" ref="googleButton"></div>
    </div>
</template>
<script setup>
    import { nextTick, onMounted, ref } from 'vue';
    import { initialiseGoogleIdentity } from '../../../services/googleIdentityService';

    const emit = defineEmits(['google-login-id-token']);

    const googleButton = ref(null);
    const isGoogleButtonLoading = ref(true);

    onMounted(async () => {
        try {
            await nextTick();
            await initialiseGoogleIdentity(handleGoogleResponse);

            if (!googleButton.value) {
                throw new Error('Google button parent element is not available.');
            }

            window.google.accounts.id.renderButton(
                googleButton.value,
                {
                    theme: 'outline',
                    size: 'large',
                    type: 'standard',
                    shape: 'pill',
                    text: 'continue_with',
                    width: 500
                }
            );

            isGoogleButtonLoading.value = false;
        } catch(error) {
            console.error(error);
            isGoogleButtonLoading.value = false;
        }
    });

    async function handleGoogleResponse(response) {
        emit('google-login-id-token', response.credential);
    }
</script>