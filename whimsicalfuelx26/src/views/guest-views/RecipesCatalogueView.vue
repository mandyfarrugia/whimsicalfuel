<script setup>
    import { reactive, ref, computed, watch, onMounted, onUnmounted } from 'vue';
    import DataRefinement from '../../components/user-interface/wrappers/DataRefinement.vue';
    import RecipeCard from '../../components/user-interface/cards/RecipeCard.vue';
    import StateMessageCard from '../../components/user-interface/cards/StateMessageCard.vue';
    import { useRecipesPiniaStore } from '../../stores/recipesPiniaStore.js';
    import { matchesSelectedValue } from '../../services/selectionMatchService.js';

    const recipesPiniaStore = useRecipesPiniaStore();

    onMounted(() => {
        recipesPiniaStore.fetchRecipes();
    });

    onUnmounted(() => {
        recipesPiniaStore.stopFetchingRecipes();
    });

    const searchQuery = ref(null);
    const selectedFoodCategory = ref(null);
    const selectedSortingOption = ref(null);
    const selectedMealPeriod = ref(null);
    const selectedProteinType = ref(null);

    const refinedRecipes = computed(() => {
        let resultSet = [...recipesPiniaStore.recipes];

        if(searchQuery.value) {
            resultSet = resultSet.filter((recipe) => {
                return recipe.title
                    ?.toLocaleLowerCase()
                    .includes(searchQuery.value.toLocaleLowerCase()) 
            });
        }

        if (selectedFoodCategory.value) {
            resultSet = resultSet.filter((recipe) => {
                return matchesSelectedValue(recipe.mealTypes, selectedFoodCategory.value);
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
        [searchQuery, selectedFoodCategory, selectedMealPeriod, selectedProteinType, selectedSortingOption],
        () => {
            currentPage.value = 1;
        }
    )
</script>
<template>
    <div class="w-100 pa-5 pt-10">
        <h1 class="text-headline-large font-weight-bold text-center mb-6">Recipes</h1>
        <DataRefinement
            v-model:search-query="searchQuery"
            v-model:selected-food-category="selectedFoodCategory"
            v-model:selected-meal-period="selectedMealPeriod"
            v-model:selected-protein-type="selectedProteinType"
            v-model:selected-sorting-option="selectedSortingOption"/>
        <div class="d-flex flex-wrap ga-4 justify-center">
            <RecipeCard v-if="refinedRecipes && refinedRecipes.length > 0"
                v-for="recipe in paginatedRecipesCatalogue"
                :recipe="recipe"
                :key="recipe.id"/>
            <StateMessageCard
                v-else
                emoji="😟"
                title="Oh no!"
                message="Unfortunately, no recipes are available at the moment! Please check back later!"/>
        </div>
        <div v-if="totalPages > 0" class="d-flex justify-center mt-6">
            <v-pagination
                v-model="currentPage"
                :length="totalPages"
                rounded="pill"
                color="primary"/>
        </div>
        <p v-if="totalPages > 0" class="text-center mt-1">Page {{ currentPage }} of {{ totalPages }}</p>
    </div>
</template>