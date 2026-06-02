<script setup>
    import { ref } from 'vue';
    import SearchField from './filters/SearchField.vue';
    import FilterByCriteria from './filters/FilterByCriteria.vue';
    import OrderByCriteria from './filters/OrderByCriteria.vue';   

    defineProps({
        dataSource: Array
    })

    const searchQuery = ref(null);
    const selectedFoodCategory = ref(null);
    const selectedSortingOption = ref(null);

    const foodCategories = [
        "Pizza 🍕",
        "Fish 🐟",
        "Beef 🥩",
        "Poultry 🍗",
        "Dessert 🍰",
        "Wraps 🌯",
        "Breakfast 🍳",
        "Pies 🥧"
    ];

    const sortedFoodCategories = foodCategories.sort((firstCategory, secondCategory) => firstCategory.localeCompare(secondCategory));

    const sortingOptions = [
        { title: 'Recipe ⬆️', value: 'recipe-ascending' },
        { title: 'Recipe ⬇️', value: 'recipe-descending' }
    ];
</script>
<template>
    <v-row class="mb-4">
        <v-col cols="12" md="4">
            <SearchField
                label="Search for a specific recipe"
                :search-query="searchQuery"/>
        </v-col>
        <v-col cols="12" md="4">
            <FilterByCriteria
                label="Filter by Food Category"
                :selected-filter="selectedFoodCategory"
                :filter-options="foodCategories"/>
        </v-col>
        <v-col cols="12" md="4">
            <OrderByCriteria
                label="Sort by Recipes"
                :selected-sorting-option="selectedSortingOption"
                :sorting-options="sortingOptions"/>
        </v-col>
    </v-row>
</template>