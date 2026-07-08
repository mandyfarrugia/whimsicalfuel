<script setup>
    import { reactive, ref, computed, watch, onMounted, onUnmounted } from 'vue';
    import { storeToRefs } from 'pinia';
    import DataRefinement from '../../components/user-interface/wrappers/DataRefinement.vue';
    import RecipeCard from '../../components/user-interface/cards/RecipeCard.vue';
    import StateMessageCard from '../../components/user-interface/cards/StateMessageCard.vue';
    import { useRecipesPiniaStore } from '../../stores/recipesPiniaStore.js';
    import { matchesSelectedValue } from '../../services/selectionMatchService.js';

    const recipesPiniaStore = useRecipesPiniaStore();
    const { recipes, isRecipesLoading } = storeToRefs(recipesPiniaStore);

    onMounted(() => {
        recipesPiniaStore.fetchApprovedRecipes();
    });

    onUnmounted(() => {
        recipesPiniaStore.stopFetchingRecipes();
    });

    const searchQuery = ref(null);
    const selectedMealType = ref(null);
    const selectedSortingOption = ref(null);
    const selectedMealPeriod = ref(null);
    const selectedProteinType = ref(null);

    const refinedRecipes = computed(() => {
        let resultSet = [...recipes.value];

        if(searchQuery.value) {
            resultSet = resultSet.filter((recipe) => {
                return recipe.title
                    ?.toLocaleLowerCase()
                    .includes(searchQuery.value.toLocaleLowerCase()) 
            });
        }

        if (selectedMealType.value) {
            resultSet = resultSet.filter((recipe) => {
                return matchesSelectedValue(recipe.mealTypes, selectedMealType.value);
            });
        }

        if (selectedMealPeriod.value) {
            resultSet = resultSet.filter((recipe) => {
                return matchesSelectedValue(recipe.mealPeriods, selectedMealPeriod.value);
            });
        }

        if (selectedProteinType.value) {
            resultSet = resultSet.filter((recipe) => {
                return matchesSelectedValue(
                    recipe.nutrientSources?.proteinSources,
                    selectedProteinType.value
                );
            });
        }

        switch(selectedSortingOption.value) {
            case 'recipe-descending':
                resultSet = resultSet.sort((firstCategory, secondCategory) => secondCategory.title.localeCompare(firstCategory.title));
                break;
            default:
                resultSet = resultSet.sort((firstCategory, secondCategory) => firstCategory.title.localeCompare(secondCategory.title))
        }

        return resultSet;
    });

    const currentPage = ref(1);
    const RECIPES_PER_PAGE = 5;

    const paginatedRecipesCatalogue = computed(() => {
        const startIndex = (currentPage.value - 1) * RECIPES_PER_PAGE;
        const endIndex = startIndex + RECIPES_PER_PAGE;
        return refinedRecipes.value.slice(startIndex, endIndex);
    });

    const totalPages = computed(() => {
        return Math.ceil(refinedRecipes.value.length / RECIPES_PER_PAGE);
    });

    watch(
        [
            searchQuery,
            selectedMealType,
            selectedMealPeriod,
            selectedProteinType,
            selectedSortingOption
        ],
        () => {
            currentPage.value = 1;
        }
    );

    watch(totalPages, (newTotalPages) => {
        if (newTotalPages === 0) {
            currentPage.value = 1;
            return;
        }

        if (currentPage.value > newTotalPages) {
            currentPage.value = newTotalPages;
        }
    });

    const deleteRecipe = async (recipe) => {
        try {
            await recipesPiniaStore.deleteRecipe(recipe);
        } catch (error) {
            console.error(error);
        }
    };
</script>
<template>
    <div class="w-100 pa-5 pt-10">
        <h1 class="text-headline-large font-weight-bold text-center mb-6">Recipes</h1>
        <DataRefinement
            v-model:search-query="searchQuery"
            v-model:selected-meal-type="selectedMealType"
            v-model:selected-meal-period="selectedMealPeriod"
            v-model:selected-protein-type="selectedProteinType"
            v-model:selected-sorting-option="selectedSortingOption"/>
        <div class="d-flex flex-wrap ga-4 justify-center">
            <template v-if="isRecipesLoading">
                <RecipeCard
                    v-for="index in 3"
                    :key="`recipe-skeleton-${index}`"
                    :recipe="null"
                    :is-loading="true"
                />
            </template>
            <template v-else-if="refinedRecipes.length > 0">
                <RecipeCard
                    v-for="recipe in paginatedRecipesCatalogue"
                    :key="recipe.id"
                    :recipe="recipe"
                    :is-loading="false"
                    @delete-recipe="deleteRecipe"
                />
            </template>
            <StateMessageCard
                v-else
                emoji="😟"
                title="Oh no!"
                message="Unfortunately, no recipes are available at the moment! Please check back later!"
            />
        </div>
        <div
            v-if="!isRecipesLoading && totalPages > 1"
            class="pagination-wrapper"
        >
            <v-pagination
                v-model="currentPage"
                :length="totalPages"
                :total-visible="5"
                rounded="circle"
                color="primary"
                density="comfortable"
                :disabled="isRecipesLoading"
                :key="`pagination-${totalPages}`"
            />
        </div>

        <p
            v-if="!isRecipesLoading && totalPages > 1"
            class="text-center mt-1"
        >
            Page {{ currentPage }} of {{ totalPages }}
        </p>
    </div>
</template>
<style scoped>
    .pagination-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 24px;
        min-height: 64px;
        overflow: hidden;
    }

    .pagination-wrapper :deep(.v-pagination) {
        flex-wrap: nowrap;
    }

    .pagination-wrapper :deep(.v-btn) {
        transition: none !important;
    }

    .pagination-wrapper :deep(.v-ripple__container) {
        display: none !important;
    }
</style>