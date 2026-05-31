<script setup>
    import ReusableForm from '../../components/user-interface/forms/ReusableForm.vue';
    import ContinueWithGoogleButton from '../../components/user-interface/buttons/ContinueWithGoogleButton.vue';
    import { useAuthenticationPiniaStore } from '../../stores/authenticationPiniaStore.js';
    import { ref, computed, reactive } from 'vue';
    import { useVuelidate } from '@vuelidate/core';
    import { email, helpers, required, sameAs } from '@vuelidate/validators';

    const authenticationPiniaStore = useAuthenticationPiniaStore();
    const errorMessage = ref('');

    async function loginWithGoogle(idToken) {
        try {
            errorMessage.value = '';
            await authenticationPiniaStore.loginWithGoogleCredentials(idToken);
        } catch(error) {
            console.error(error);
            errorMessage.value = authenticationPiniaStore.errorMessage || 'Google login failed!';
        }
    }
    
    const registrationForm = reactive({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        dateOfBirth: null
    });

    const validationRules = computed(() => ({
        firstName: {
            required: helpers.withMessage('First name is required!', required)
        },
        lastName: {
            required: helpers.withMessage('Last name is required!', required)
        },
        emailAddress: {
            required: helpers.withMessage('Email address is required!', required),
            email: helpers.withMessage('Email address must be in the correct format!', email)
        }
    }));

    const v$ = useVuelidate(validationRules, registrationForm, {
        $autoDirty: true
    });

    const validationErrors = computed(() => ({
        firstName: v$.value.firstName.$dirty ? [] : v$.value.firstName.$errors.map(error => error.$message),
        lastName: v$.value.lastName.$dirty ? [] : v$.value.lastName.$errors.map(error => error.$message),
        emailAddress: v$.value.emailAddress.$dirty ? [] : v$.value.emailAddress.$errors.map(error => error.$message)
    }));
</script>
<template>
    <div class="w-100 pa-4 pt-10">
        <ReusableForm
            title="Register"
            subtitle="Get started on your health journey today!"
            button-text="Register"
            :disabled-based-on="v$.$invalid">
            <template #form-content>
                <v-text-field
                    :error="v$.firstName.$error"
                    :error-messages="validationErrors.firstName"
                    v-model="registrationForm.firstName"
                    label="First Name"
                    density="comfortable"
                    variant="outlined">
                </v-text-field>
                <v-text-field
                    :error="v$.lastName.$error"
                    :error-messages="validationErrors.lastName"
                    v-model="registrationForm.lastName"
                    label="Last Name"
                    density="comfortable"
                    variant="outlined"></v-text-field>
                <v-text-field label="Date of Birth" type="date" density="comfortable" variant="outlined"></v-text-field>
                <v-text-field
                    :error="v$.emailAddress.$error"
                    :error-messages="validationErrors.emailAddress"
                    v-model="registrationForm.emailAddress"
                    label="Email Address"
                    density="comfortable"
                    variant="outlined">
                </v-text-field>
                <v-text-field label="Password" type="password" density="comfortable" variant="outlined"></v-text-field>
                <v-text-field label="Confirm Password" type="password" density="comfortable" variant="outlined"></v-text-field>
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
