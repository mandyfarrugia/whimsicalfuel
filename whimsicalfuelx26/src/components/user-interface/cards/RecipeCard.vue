<script setup>
    import VideoPlaceholder from '../wrappers/VideoPlaceholder.vue';

    defineProps({
        recipe: Object
    })
</script>
<template>
    <v-card
        width="600"
        max-width="100%"
        class="d-flex flex-column align-center text-center overflow-hidden"
        elevation="2">
        <VideoPlaceholder :recipe="recipe"/>
        <div class="pa-4">
            <h2 class="text-h6 mt-5 mb-4 font-weight-bold">{{ recipe.title }}</h2>
        </div>
        <div class="d-flex justify-center ga-2 flex-wrap mb-6">
            <v-btn
                prepend-icon="mdi-eye"
                color="primary"
                rounded="pill">
                View
            </v-btn>
            <v-btn
                prepend-icon="mdi-pencil"
                color="warning"
                rounded="pill">
                Edit
            </v-btn>
            <v-btn
                color="error"
                prepend-icon="mdi-delete"
                rounded="pill">
                Delete
            </v-btn>
        </div>
    </v-card>
</template>