<script setup>
    import { onMounted, onUnmounted, ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useSnackbar } from 'vue3-snackbar';
    import { useRecipesPiniaStore } from '../../stores/recipesPiniaStore';
    import VideoPlaceholder from '../../components/user-interface/wrappers/VideoPlaceholder.vue';

    const recipesPiniaStore = useRecipesPiniaStore();
    const snackbar = useSnackbar();

    const { pendingRecipes } = storeToRefs(recipesPiniaStore);

    const recipeBeingProcessedId = ref(null);

    onMounted(() => {
        recipesPiniaStore.fetchPendingRecipes();
    });

    onUnmounted(() => {
        recipesPiniaStore.stopFetchingPendingRecipes();
    });

    const isRecipeBeingProcessed = (recipeId) => {
        return recipeBeingProcessedId.value === recipeId;
    };

    const approveRecipe = async (recipe) => {
        if(isRecipeBeingProcessed(recipe.id) || recipe.approvalStatus !== 'Pending') {
            return;
        }

        try {
            recipeBeingProcessedId.value = recipe.id;

            await recipesPiniaStore.approveRecipe(recipe);

            snackbar.add({
                type: 'success',
                text: 'Recipe has been approved successfully!',
                dismissible: true,
                duration: 5000
            });
        } catch (error) {
            console.error(error);

            snackbar.add({
                type: 'error',
                text: 'Recipe could not be approved.',
                dismissible: true,
                duration: 5000
            });
        } finally {
            recipeBeingProcessedId.value = null;
        }
    };

    const rejectRecipe = async (recipe) => {
        if(isRecipeBeingProcessed(recipe.id) || recipe.approvalStatus !== 'Pending') {
            return;
        }

        try {
            recipeBeingProcessedId.value = recipe.id;

            await recipesPiniaStore.rejectRecipe(recipe);

            snackbar.add({
                type: 'success',
                text: 'Recipe has been rejected.',
                dismissible: true,
                duration: 5000
            });
        } catch (error) {
            console.error(error);

            snackbar.add({
                type: 'error',
                text: 'Recipe could not be rejected.',
                dismissible: true,
                duration: 5000
            });
        } finally {
            recipeBeingProcessedId.value = null;
        }
    };
</script>
<template>
    <div class="pa-6 mx-auto pending-recipes-page">
        <div class="mb-6">
            <h1 class="text-h4 font-weight-bold">
                Pending Recipes
            </h1>

            <p class="text-body-1 text-medium-emphasis">
                Review recipes submitted by users before they appear in the public catalogue.
            </p>
        </div>

        <v-alert
            v-if="pendingRecipes.length === 0"
            type="info"
            variant="tonal"
            rounded="xl"
        >
            There are no recipes pending approval.
        </v-alert>

        <v-row
            v-else
            justify="center">
            <v-col
                v-for="recipe in pendingRecipes"
                :key="recipe.id"
                cols="12"
                md="10"
                lg="8"
                xl="6"
            >
                <v-card
                    color="surface"
                    rounded="xl"
                    elevation="3"
                    class="h-100 d-flex flex-column"
                >
                    <VideoPlaceholder
                        :recipe="recipe"
                        ></VideoPlaceholder>

                    <v-card-title class="font-weight-bold">
                        {{ recipe.title }}
                    </v-card-title>

                    <v-card-subtitle>
                        {{ recipe.calories }} kcal · {{ recipe.servings }} servings
                    </v-card-subtitle>

                    <v-card-text>
                        <p class="font-weight-bold mb-2">
                            Meal categories
                        </p>

                        <div class="d-flex flex-wrap ga-2 mb-4">
                            <v-chip
                                v-for="mealType in recipe.mealTypes"
                                :key="mealType"
                                color="primary"
                                variant="tonal"
                                size="small"
                            >
                                {{ mealType }}
                            </v-chip>
                        </div>

                        <p class="font-weight-bold mb-2">
                            Meal periods
                        </p>

                        <div class="d-flex flex-wrap ga-2 mb-4">
                            <v-chip
                                v-for="mealPeriod in recipe.mealPeriods"
                                :key="mealPeriod"
                                color="secondary"
                                variant="tonal"
                                size="small"
                            >
                                {{ mealPeriod }}
                            </v-chip>
                        </div>

                        <p class="font-weight-bold mb-2">
                            Ingredients
                        </p>

                        <ul class="mb-4">
                            <li
                                v-for="ingredient in recipe.ingredients"
                                :key="ingredient.item"
                            >
                                {{ ingredient.amount }}
                                {{ ingredient.measurement }}
                                {{ ingredient.item }}
                            </li>
                        </ul>

                        <p class="font-weight-bold mb-2">
                            Instructions
                        </p>

                        <ol>
                            <li
                                v-for="step in recipe.recipe"
                                :key="step.instruction"
                            >
                                {{ step.instruction }}
                            </li>
                        </ol>

                        <v-alert
                            v-if="recipe.additionalRemarks"
                            type="info"
                            variant="tonal"
                            class="mt-4"
                            rounded="lg"
                        >
                            {{ recipe.additionalRemarks }}
                        </v-alert>
                    </v-card-text>

                    <v-spacer />

                    <v-card-actions class="pa-4 d-flex justify-end ga-2">
                        <v-btn
                            color="error"
                            variant="tonal"
                            rounded="pill"
                            prepend-icon="mdi-close"
                            :disabled="isRecipeBeingProcessed(recipe.id)"
                            :loading="isRecipeBeingProcessed(recipe.id)"
                            @click="rejectRecipe(recipe)"
                        >
                            Reject
                        </v-btn>

                        <v-btn
                            color="success"
                            variant="elevated"
                            rounded="pill"
                            prepend-icon="mdi-check"
                            :disabled="isRecipeBeingProcessed(recipe.id)"
                            :loading="isRecipeBeingProcessed(recipe.id)"
                            @click="approveRecipe(recipe)"
                        >
                            Approve
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>