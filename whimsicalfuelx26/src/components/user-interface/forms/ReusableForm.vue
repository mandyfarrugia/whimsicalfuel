<template>
    <v-card color="surface" max-width="500" width="100%" rounded="xl" elevation="2" class="mx-auto pa-6 mt-10 mb-8">
        <h1 class="text-headline-large font-weight-bold text-center mb-4">{{ title }}</h1>
        <p class="text-medium-emphasis text-center mb-6">{{ subtitle }}</p>
        <v-form class="d-flex flex-column ga-4" @submit.prevent="submit">
            <slot name="form-content"/>
            <v-btn :disabled="disabledBasedOn" :color="buttonColour" rounded="pill" size="large" block type="submit">{{ buttonText }}</v-btn>
        </v-form>
        <slot name="actions"/>
    </v-card>
</template>
<script setup>
    defineProps({
        title: String,
        subtitle: String,
        buttonText: String,
        buttonColour: {
            type: String,
            default: 'secondary'
        },
        disabledBasedOn: Boolean
    });

    const emit = defineEmits(['submit']);

    const submit = () => {
        emit('submit');
    };
</script>