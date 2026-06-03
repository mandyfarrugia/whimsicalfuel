<script setup>
    import { ref } from 'vue';
    import SearchField from '../filters/SearchField.vue';
    import FilterByCriteria from '../filters/FilterByCriteria.vue';
    import OrderByCriteria from '../filters/OrderByCriteria.vue';   

    defineProps({
        searchQuery: String,
        selectedFoodCategory: String,
        selectedMealPeriod: String,
        selectedProteinType: String,
        selectedSortingOption: String
    });

    const foodCategories = [
        { title: 'Pizza 🍕', value: 'Pizza' },
        { title: 'Pasta 🍝', value: 'Pasta' },
        { title: 'Desserts 🍰', value: 'Desserts' },
        { title: 'Wraps 🌯', value: 'Wraps' },
        { title: 'Pies 🥧', value: 'Pies' },
        { title: 'Burgers 🍔', value: 'Burgers' },
        { title: 'Patties 🧆', value: 'Patties' },
        { title: 'Main Dish 🍽️', value: 'Main Dish' },
        { title: 'Sushi 🍣', value: 'Sushi' },
        { title: 'Seafood 🦞', value: 'Seafood' }
    ];

    const sortedFoodCategories = [...foodCategories].sort((firstCategory, secondCategory) => firstCategory.title.localeCompare(secondCategory.title));

    const proteinTypes = [
        { title: 'Chicken 🍗', value: 'Chicken' },
        { title: 'Beef 🥩', value: 'Beef' },
        { title: 'Fish 🐟', value: 'Fish' },
        { title: 'Eggs 🍳', value: 'Eggs' },
        { title: 'Tuna 🐟', value: 'Tuna' },
        { title: 'Turkey 🦃', value: 'Turkey' },
        { title: 'Plant-Based 🌱', value: 'Plant-Based' }
    ];

    const mealPeriods = [
        { title: 'Breakfast 🍳', value: 'Breakfast' },
        { title: 'Lunch 🥗', value: 'Lunch' },
        { title: 'Dinner 🍽️', value: 'Dinner' },
        { title: 'Snack 🍎', value: 'Snack' }
    ];

    const sortingOptions = [
        { title: 'Recipe ⬆️', value: 'recipe-ascending' },
        { title: 'Recipe ⬇️', value: 'recipe-descending' }
    ];

    const emit = defineEmits([
        'update:searchQuery',
        'update:selectedFoodCategory',
        'update:selectedMealPeriod',
        'update:selectedProteinType',
        'update:selectedSortingOption'
    ])
</script>
<template>
    <v-row class="mb-8 px-4">
        <v-col cols="12" md="4">
            <SearchField
                label="Search for a specific recipe"
                :model-value="searchQuery"
                @update:model-value="emit('update:searchQuery', $event)"/>
        </v-col>
        <v-col cols="12" md="4">
            <FilterByCriteria
                label="Filter by Food Category"
                @update:model-value="emit('update:selectedFoodCategory', $event)"
                :model-value="selectedFoodCategory"
                :filter-options="sortedFoodCategories"/>
        </v-col>
        <v-col cols="12" md="4">
            <FilterByCriteria
                label="Filter by Meal Period"
                @update:model-value="emit('update:selectedMealPeriod', $event)"
                :model-value="selectedMealPeriod"
                :filter-options="mealPeriods"/>
        </v-col>
        <v-col cols="12" md="6">
            <FilterByCriteria
                label="Filter by Protein Type"
                @update:model-value="emit('update:selectedProteinType', $event)"
                :model-value="selectedProteinType"
                :filter-options="proteinTypes"/>
        </v-col>
        <v-col cols="12" md="6">
            <OrderByCriteria
                label="Sort by Recipes"
                @update:model-value="emit('update:selectedSortingOption', $event)"
                :model-value="selectedSortingOption"
                :sorting-options="sortingOptions"/>
        </v-col>
    </v-row>
</template>