<template>
    <div class="w-100 pa-4">
        <ReusableForm
            title="Login"
            subtitle="Get back on track with your health journey!"
            button-text="Login"
            @submit="onSubmit">
            <v-text-field label="Email" density="comfortable" variant="outlined"></v-text-field>
            <v-text-field type="password" label="Password" density="comfortable" variant="outlined"></v-text-field>
        </ReusableForm>
    </div>
</template>
<script setup>
    import ReusableForm from '../../components/user-interface/forms/ReusableForm.vue';

    async function onSubmit() {
        console.log('Hello World!');
    }
</script>