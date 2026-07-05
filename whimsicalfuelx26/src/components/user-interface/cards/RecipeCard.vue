<script setup>
    import { ref } from 'vue';
    import ConfirmDeletionModal from '../modals/ConfirmDeletionModal.vue';
    import VideoPlaceholder from '../wrappers/VideoPlaceholder.vue';

    const props = defineProps({
        recipe: {
            type: Object,
            default: null
        },
        isLoading: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(['delete-recipe']);

    const isDeleteModalOpen = ref(false);

    const openDeleteModal = () => {
        isDeleteModalOpen.value = true;
    };

    const confirmDeleteRecipe = () => {
        emit('delete-recipe', props.recipe);
    };
</script>

<template>
    <v-card
        width="600"
        max-width="100%"
        class="d-flex flex-column align-center text-center overflow-hidden"
        elevation="2"
    >
        <VideoPlaceholder
            v-if="!isLoading && recipe"
            :recipe="recipe"
        />

        <v-skeleton-loader
            v-else
            type="image"
            width="100%"
            height="300"
        />

        <div class="pa-4 w-100">
            <v-skeleton-loader
                v-if="isLoading"
                type="heading"
                class="mx-auto recipe-title-skeleton"
            />

            <h2
                v-else
                class="text-h6 mt-5 mb-4 font-weight-bold"
            >
                {{ recipe?.title }}
            </h2>
        </div>

        <div class="d-flex justify-center ga-2 flex-wrap mb-6">
            <template v-if="isLoading">
                <v-skeleton-loader type="button" width="90" />
                <v-skeleton-loader type="button" width="90" />
                <v-skeleton-loader type="button" width="90" />
            </template>

            <template v-else-if="recipe">
                <v-btn
                    prepend-icon="mdi-eye"
                    color="primary"
                    rounded="pill"
                >
                    View
                </v-btn>

                <v-btn
                    :to="`/recipes/${recipe.id}/edit`"
                    prepend-icon="mdi-pencil"
                    color="warning"
                    rounded="pill"
                >
                    Edit
                </v-btn>

                <v-btn
                    color="error"
                    prepend-icon="mdi-delete"
                    rounded="pill"
                    @click="openDeleteModal"
                >
                    Delete
                </v-btn>
            </template>
        </div>
        <ConfirmDeletionModal
            v-model="isDeleteModalOpen"
            @confirm-delete="confirmDeleteRecipe"
        />
    </v-card>
</template>

<style scoped>
    .recipe-title-skeleton {
        max-width: 260px;
    }
</style>