<script setup>
    import ReusableForm from '../../components/user-interface/forms/ReusableForm.vue';
    import ContinueWithGoogleButton from '../../components/user-interface/buttons/ContinueWithGoogleButton.vue';
    import { useAuthenticationPiniaStore } from '../../stores/authenticationPiniaStore.js';
    import { ref, computed, reactive, toRef } from 'vue';
    import { useVuelidate } from '@vuelidate/core';
    import { email, helpers, required, sameAs, minLength, maxLength } from '@vuelidate/validators';
    import { useCustomDateValidation } from '../../composables/useCustomDateValidation.js';
    import { useRouter } from 'vue-router';

    const { isDateValid, cannotBeFromTheFuture, isAtLeastOfMinimumAge }  = useCustomDateValidation();
    const authenticationPiniaStore = useAuthenticationPiniaStore();
    const router = useRouter();

    const errorMessage = ref('');

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
    
    const registrationForm = reactive({
        firstName: '',
        lastName: '',
        username: '',
        emailAddress: '',
        dateOfBirth: null,
        password: '',
        confirmPassword: ''
    });
    
    const passwordToRef = toRef(registrationForm, 'password');
    const dateOfBirthToRef = toRef(registrationForm, 'dateOfBirth');

    const inputFieldsLimits = {
        firstName: {
            minLength: 2,
            maxLength: 75
        },
        lastName: {
            minLength: 2,
            maxLength: 75
        },
        username: {
            minLength: 2,
            maxLength: 35
        },
        dateOfBirth: {
            minimumAge: 18
        }
    }

    const validationRules = computed(() => ({
        firstName: {
            required: helpers.withMessage('First name is required!', required),
            minLength: helpers.withMessage(
                ({ $params }) => `First name must be at least ${$params.min} characters long!`,
                minLength(inputFieldsLimits.firstName.minLength),
            ),
            maxLength: helpers.withMessage(
                ({ $params }) => `First name must not exceed ${$params.max} characters!`,
                maxLength(inputFieldsLimits.firstName.maxLength)
            )
        },
        lastName: {
            required: helpers.withMessage('Last name is required!', required),
            minLength: helpers.withMessage(
                ({ $params }) => `Last name must be at least ${$params.min} characters long!`,
                minLength(inputFieldsLimits.lastName.minLength)
            ),
            maxLength: helpers.withMessage(
                ({ $params }) => `Last name must not exceed ${$params.max} characters!`,
                maxLength(inputFieldsLimits.lastName.maxLength)
            )
        },
        username: {
            required: helpers.withMessage('Username is required!', required),
            minLength: helpers.withMessage(
                ({ $params }) => `Username must be at least ${$params.min} characters long!`,
                minLength(inputFieldsLimits.username.minLength)
            ),
            maxLength: helpers.withMessage(
                ({ $params }) => `Username must not exceed ${$params.max} characters!`,
                maxLength(inputFieldsLimits.username.maxLength)
            )
        },
        dateOfBirth: {
            isDateValid,
            cannotBeFromTheFuture,
            isAtLeastOfMinimumAge: isAtLeastOfMinimumAge(inputFieldsLimits.dateOfBirth.minimumAge)
        },
        emailAddress: {
            required: helpers.withMessage('Email address is required!', required),
            email: helpers.withMessage('Email address must be in the correct format!', email)
        },
        password: {
            required: helpers.withMessage('Password is required!', required)
        },
        confirmPassword: {
            required: helpers.withMessage('Please confirm your password!', required),
            sameAsPassword: helpers.withMessage('Passwords do not match!', sameAs(passwordToRef))
        }
    }));

    const v$ = useVuelidate(validationRules, registrationForm, {
        $autoDirty: true
    });

    const validationErrors = computed(() => ({
        firstName: !v$.value.firstName.$dirty ? [] : v$.value.firstName.$errors.map(error => error.$message),
        lastName: !v$.value.lastName.$dirty ? [] : v$.value.lastName.$errors.map(error => error.$message),
        username: !v$.value.username.$dirty ? [] : v$.value.username.$errors.map(error => error.$message),
        dateOfBirth: !v$.value.dateOfBirth.$dirty ? [] : v$.value.dateOfBirth.$errors.map(error => error.$message),
        emailAddress: !v$.value.emailAddress.$dirty ? [] : v$.value.emailAddress.$errors.map(error => error.$message),
        password: !v$.value.password.$dirty ? [] : v$.value.password.$errors.map(error => error.$message),
        confirmPassword: !v$.value.confirmPassword.$dirty ? [] : v$.value.confirmPassword.$errors.map(error => error.$message)
    }));

    const registerUser = async () => {
        const isValid = await v$.value.$validate();
        if(!isValid) return;
        
        try {
            await authenticationPiniaStore.registerUser(registrationForm);
            router.push('/recipes-catalogue');
        } catch(error) {
            console.error(error);
        }
    }
</script>
<template>
    <div class="w-100 pa-4 pt-10">
        <ReusableForm
            title="Register"
            subtitle="Get started on your health journey today!"
            button-text="Register"
            :disabled-based-on="v$.$invalid"
            @submit="registerUser">
            <template #form-content>
                <v-text-field
                    :error="v$.firstName.$error"
                    :error-messages="validationErrors.firstName"
                    v-model="registrationForm.firstName"
                    :counter="inputFieldsLimits.firstName.maxLength"
                    label="First Name"
                    density="comfortable"
                    variant="outlined">
                </v-text-field>
                <v-text-field
                    :error="v$.lastName.$error"
                    :error-messages="validationErrors.lastName"
                    v-model="registrationForm.lastName"
                    :counter="inputFieldsLimits.lastName.maxLength"
                    label="Last Name"
                    density="comfortable"
                    variant="outlined">
                </v-text-field>
                <v-text-field
                    :error="v$.username.$error"
                    :error-messages="validationErrors.username"
                    v-model="registrationForm.username"
                    :counter="inputFieldsLimits.username.maxLength"
                    label="Username"
                    density="comfortable"
                    variant="outlined">
                </v-text-field>
                <v-text-field
                    :error="v$.dateOfBirth.$error",
                    :error-messages="validationErrors.dateOfBirth"
                    v-model="registrationForm.dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    density="comfortable"
                    variant="outlined">
                </v-text-field>
                <v-text-field
                    :error="v$.emailAddress.$error"
                    :error-messages="validationErrors.emailAddress"
                    v-model="registrationForm.emailAddress"
                    label="Email Address"
                    density="comfortable"
                    variant="outlined">
                </v-text-field>
                <v-text-field
                    :error="v$.password.$error"
                    :error-messages="validationErrors.password"
                    v-model="registrationForm.password"
                    label="Password"
                    type="password"
                    density="comfortable"
                    variant="outlined">
                </v-text-field>
                <v-text-field
                    :error="v$.confirmPassword.$error"
                    :error-messages="validationErrors.confirmPassword"
                    v-model="registrationForm.confirmPassword"
                    label="Confirm Password"
                    type="password"
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
