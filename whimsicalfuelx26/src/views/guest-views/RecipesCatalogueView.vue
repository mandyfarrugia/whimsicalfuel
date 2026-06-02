<script setup>
    import { reactive, ref, computed } from 'vue';
    import DataRefinement from '../../components/user-interface/wrappers/DataRefinement.vue';
    import RecipeCard from '../../components/user-interface/wrappers/RecipeCard.vue';

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
            mealTypes: 'Poultry',
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
            mealTypes: 'Dessert',
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
            mealTypes: 'Fish',
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
            mealTypes: 'Beef',
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
            mealTypes: 'Beef',
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
            resultSet = resultSet.filter(recipe => recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
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
            <RecipeCard
                v-for="recipe in paginatedRecipesCatalogue"
                :recipe="recipe"
                :key="recipe.id"/>
        </div>
        <div class="d-flex justify-center mt-6">
            <v-pagination
                v-model="currentPage"
                :length="totalPages"
                rounded="pill"
                color="primary"/>
        </div>
        <p class="text-center mt-1">Page {{ currentPage }} of {{ totalPages }}</p>
    </div>
</template>