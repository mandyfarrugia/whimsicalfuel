<script setup>
    import { reactive, ref, computed } from 'vue';
    import DataRefinement from '../../components/user-interface/wrappers/DataRefinement.vue';
    import RecipeCard from '../../components/user-interface/cards/RecipeCard.vue';
    import StateMessageCard from '../../components/user-interface/cards/StateMessageCard.vue';

    const searchQuery = ref(null);
    const selectedFoodCategory = ref(null);
    const selectedSortingOption = ref(null);
    const selectedMealPeriod = ref(null);
    const selectedProteinType = ref(null);

    const recipes = reactive([
        {
            id: 1,
            title: 'Pizza fuq il-Hobz',
            mealTypes: 'Pizza',
            proteinTypes: 'Tuna',
            mealPeriods: 'Lunch',
            ingredients: [
                '100g bread of choice',
                '40g tomato polpa',
                '40g drained tuna in brine (or cooked chicken breast)',
                '1 teaspoon olives',
                '1/2 teaspoon capers',
                '20g mozzarella'
            ],
            serving: 1,
            videoUrl: 'https://www.youtube.com/embed/IFIBV7Tg-_c?si=PgThzk7cLaTIh3Sf'
        },
        {
            id: 2,
            title: 'Cordon Bleu',
            mealTypes: 'Main Dish',
            mealPeriods: ['Lunch', 'Dinner'],
            proteinTypes: ['Chicken', 'Eggs'],
            ingredients: [
                '100g bread of choice',
                '40g tomato polpa',
                '40g drained tuna in brine (or cooked chicken breast)',
                '1 teaspoon olives',
                '1/2 teaspoon capers',
                '20g mozzarella'
            ],
            serving: 2,
            videoUrl: 'https://www.youtube.com/embed/NMCuenDFt9g?si=uoiM6FJEofJqv4-v'
        },
        {
            id: 3,
            title: 'Carrot Cake Muffins',
            mealTypes: 'Desserts',
            mealPeriods: ['Breakfast', 'Snack'],
            proteinTypes: ['Eggs'],
            ingredients: [
                '100g bread of choice',
                '40g tomato polpa',
                '40g drained tuna in brine (or cooked chicken breast)',
                '1 teaspoon olives',
                '1/2 teaspoon capers',
                '20g mozzarella'
            ],
            serving: 1,
            videoUrl: 'https://www.youtube.com/embed/mGiWx7ya8JQ?si=URE0v4ZpWQTNlWYX'
        },
        {
            id: 4,
            title: 'Crunchy Tuna Patties',
            mealTypes: ['Patties', 'Seafood', 'Main Dish'],
            mealPeriods: ['Lunch', 'Dinner'],
            proteinTypes: ['Tuna', 'Eggs'],
            ingredients: [
                '100g bread of choice',
                '40g tomato polpa',
                '40g drained tuna in brine (or cooked chicken breast)',
                '1 teaspoon olives',
                '1/2 teaspoon capers',
                '20g mozzarella'
            ],
            serving: 1,
            videoUrl: 'https://www.youtube.com/embed/v05ctwkzDIg?si=wJ6hWFKIhj3QAfRs'
        },
        {
            id: 5,
            title: '3 High Protein Burgers',
            mealTypes: ['Burgers', 'Patties', 'Main Dish'],
            mealPeriods: ['Lunch', 'Dinner'],
            proteinTypes: ['Beef'],
            ingredients: [
                '100g bread of choice',
                '40g tomato polpa',
                '40g drained tuna in brine (or cooked chicken breast)',
                '1 teaspoon olives',
                '1/2 teaspoon capers',
                '20g mozzarella'
            ],
            serving: 1,
            videoUrl: 'https://www.youtube.com/embed/lOR_bjDx2iA?si=5vByQeu_SzCcKLmQ'
        },
        {
            id: 6,
            title: 'Burger Pie',
            mealTypes: ['Burgers', 'Patties', 'Pies', 'Main Dish'],
            mealPeriods: ['Lunch', 'Dinner'],
            proteinTypes: 'Beef',
            ingredients: [
                '100g bread of choice',
                '40g tomato polpa',
                '40g drained tuna in brine (or cooked chicken breast)',
                '1 teaspoon olives',
                '1/2 teaspoon capers',
                '20g mozzarella'
            ],
            serving: 1,
            videoUrl: 'https://www.youtube.com/embed/sy3Z6JmYgGg?si=u0z3d23Kum0e4of8'
        }
    ]);

    const refinedRecipes = computed(() => {
        let resultSet = [...recipes];

        if(searchQuery.value) {
            resultSet = resultSet.filter(recipe => recipe.title.toLocaleLowerCase().includes(searchQuery.value.toLocaleLowerCase()))
        }

        if(selectedFoodCategory.value) {
            resultSet = resultSet.filter((recipe) => {
                if(Array.isArray(recipe.mealTypes))
                    return recipe.mealTypes.includes(selectedFoodCategory.value);

                return recipe.mealTypes.toLocaleLowerCase() === selectedFoodCategory.value.toLocaleLowerCase();
            });
        }

        if(selectedMealPeriod.value) {
            resultSet = resultSet.filter((recipe) => {
                if(Array.isArray(recipe.mealPeriods))
                    return recipe.mealPeriods.includes(selectedMealPeriod.value);

                return recipe.mealPeriods.toLocaleLowerCase() === selectedMealPeriod.value.toLocaleLowerCase();
            })
        }

        if(selectedProteinType.value) {
            resultSet = resultSet.filter((recipe) => {
                if(Array.isArray(recipe.proteinTypes))
                    return recipe.proteinTypes.includes(selectedProteinType.value);

                return recipe.proteinTypes.toLocaleLowerCase() === selectedProteinType.value.toLocaleLowerCase();
            })
        }

        if(selectedSortingOption.value) {
            switch(selectedSortingOption.value) {
                case 'recipe-descending':
                    resultSet = resultSet.sort((firstCategory, secondCategory) => secondCategory.title.localeCompare(firstCategory.title));
                    break;
                default:
                    resultSet = resultSet.sort((firstCategory, secondCategory) => firstCategory.title.localeCompare(secondCategory.title))
            }
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
    })
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