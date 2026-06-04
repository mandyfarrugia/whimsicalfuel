<script setup>
    import ReusableForm from '../../components/user-interface/forms/ReusableForm.vue';
    import ContinueWithGoogleButton from '../../components/user-interface/buttons/ContinueWithGoogleButton.vue';
    import { computed, reactive, ref } from 'vue';
    import { useAuthenticationPiniaStore } from '../../stores/authenticationPiniaStore.js';
    import { useVuelidate } from '@vuelidate/core';
    import { required, email, helpers } from '@vuelidate/validators';
    import { useRouter } from 'vue-router';
    import { useAnimationHelper } from '../../composables/useAnimationHelper.js';

    const authenticationPiniaStore = useAuthenticationPiniaStore();
    const router = useRouter();
    const errorMessage = ref('');
    const { getErrorAnimationClass } = useAnimationHelper();

    async function loginWithGoogle(idToken) {
        try {
            errorMessage.value = '';
            await authenticationPiniaStore.loginWithGoogleCredentials(idToken);
            router.push('/recipes-catalogue');
        } catch(error) {
            console.error(error);
            errorMessage.value = authenticationPiniaStore.errorMessage || 'Google login failed!';
        }
    }

    const loginForm = reactive({
        emailAddress: '',
        password: ''
    });

    const validationRules = computed(() => ({
        emailAddress: {
            required: helpers.withMessage('Email address is required!', required),
            email: helpers.withMessage('Email address is not in the correct format!', email)
        },
        password: {
            required: helpers.withMessage('Password is required!', required)
        }
    }));

    const v$ = useVuelidate(validationRules, loginForm, {
        $autoDirty: true
    });

    const validationErrors = computed(() => ({
        emailAddress: !v$.value.emailAddress.$dirty ? [] : v$.value.emailAddress.$errors.map(error => error.$message),
        password: !v$.value.password.$dirty ? [] : v$.value.password.$errors.map(error => error.$message)
    }));

    async function authenticateUser() {
        const isValid = await v$.value.$validate();
        if(!isValid) return;

        try {
            await authenticationPiniaStore.authenticateUser(loginForm);
            router.push('/recipes-catalogue');
        } catch(error) {
            console.error(error);
        }
    }
</script>
<template>
    <div class="w-100 pa-4 pt-10">
        <ReusableForm
            title="Login"
            subtitle="Get back on track with your health journey!"
            button-text="Login"
            @submit="authenticateUser"
            :disabled-based-on="v$.$invalid">
            <template #form-content>
                <v-text-field 
                    label="Email"
                    :class="[getErrorAnimationClass(v$.emailAddress)]"
                    :error="v$.emailAddress.$error"
                    :error-messages="validationErrors.emailAddress"
                    v-model="loginForm.emailAddress"
                    density="comfortable"
                    variant="outlined">
                </v-text-field>
                <v-text-field
                    label="Password"
                    type="password"
                    :class="[getErrorAnimationClass(v$.password)]"
                    :error="v$.password.$error"
                    :error-messages="validationErrors.password"
                    v-model="loginForm.password"
                    density="comfortable"
                    variant="outlined">
                </v-text-field>
            </template>
            <template #actions>
                <div class="my-3 d-flex align-center">
                    <v-divider/>
                </div>
                <ContinueWithGoogleButton @google-login-id-token="loginWithGoogle"></ContinueWithGoogleButton>
            </template>
        </ReusableForm>
    </div>
</template>