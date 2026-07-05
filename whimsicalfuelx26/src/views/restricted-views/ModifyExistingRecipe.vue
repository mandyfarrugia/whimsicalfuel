<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSnackbar } from 'vue3-snackbar';
import RecipeForm from "../../components/user-interface/forms/RecipeForm.vue";
import { useRecipesPiniaStore } from "../../stores/recipesPiniaStore.js";

const route = useRoute();
const router = useRouter();
const snackbar = useSnackbar();

const recipesPiniaStore = useRecipesPiniaStore();

const recipe = ref(null);
const isLoading = ref(true);

const recipeId = computed(() => {
    return route.params.id;
});

const editRecipeDraftKey = computed(() => {
    return `887e86259b2fbe4be65c9fd2fa7014f900408948-${recipeId.value}`;
});

const fetchRecipeForEditing = async () => {
    try {
        isLoading.value = true;
        recipe.value = await recipesPiniaStore.getRecipeById(recipeId.value);
    } catch (error) {
        console.error(error);

        snackbar.add({
            type: 'error',
            text: 'Recipe could not be loaded for editing.',
            dismissible: true,
            duration: 5000
        });
    } finally {
        isLoading.value = false;
    }
};

const submitUpdatedRecipe = async (recipeToSave) => {
    try {
        await recipesPiniaStore.updateRecipe(recipeId.value, recipeToSave);

        snackbar.add({
            type: 'success',
            text: 'Recipe has been updated successfully!',
            dismissible: true,
            duration: 5000
        });

        await router.push('/recipes-catalogue');
    } catch (error) {
        console.error(error);

        snackbar.add({
            type: 'error',
            text: 'Recipe could not be updated!',
            dismissible: true,
            duration: 5000
        });
    }
};

onMounted(() => {
    fetchRecipeForEditing();
});
</script>

<template>
    <div class="w-100 pa-4 pt-10">
        <v-card
            v-if="isLoading"
            color="surface"
            rounded="xl"
            elevation="2"
            class="mx-auto pa-6"
            max-width="500"
        >
            <v-skeleton-loader type="heading, paragraph, actions" />
        </v-card>

        <RecipeForm
            v-else-if="recipe"
            title="Edit recipe"
            button-text="Save changes"
            button-colour="warning"
            :initial-recipe="recipe"
            :enable-draft="true"
            :draft-key="editRecipeDraftKey"
            @submit="submitUpdatedRecipe"
        />

        <v-alert
            v-else
            type="error"
            variant="tonal"
            rounded="xl"
            class="mx-auto"
            max-width="500"
        >
            Recipe was not found.
        </v-alert>
    </div>
</template>