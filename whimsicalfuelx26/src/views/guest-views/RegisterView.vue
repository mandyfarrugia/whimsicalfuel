<script setup>
    import ReusableForm from '../../components/user-interface/forms/ReusableForm.vue';
</script>
<template>
    <div class="w-100 pa-4">
        <ReusableForm
            title="Register"
            subtitle="Get started on your health journey today!"
            button-text="Register">
            <template #form-content>
                <v-text-field label="First Name"></v-text-field>
                <v-text-field label="Last Name"></v-text-field>
                <v-text-field label="Email Address"></v-text-field>
                <v-text-field label="Date of Birth"></v-text-field>
            </template>
        </ReusableForm>
    </div>
</template>
