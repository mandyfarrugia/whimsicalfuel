<script setup>
    import { ref } from 'vue';

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
    <div class="w-100 pa-10 pt-10">
        <v-row class="mb-4">
            <v-col cols="12" md="4">
                <v-text-field
                    v-model="searchQuery"
                    label="Search recipes"
                    prepend-icon="mdi-magnify"
                    density="comfortable"
                    variant="outlined"
                    clearable/>
            </v-col>
            <v-col cols="12" md="4">
                <v-select
                    v-model="selectedFoodCategory"
                    :items="sortedFoodCategories"
                    label="Filter by Food Category"
                    density="comfortable"
                    variant="outlined"
                    clearable/>
            </v-col>
            <v-col cols="12" md="4">
                <v-select
                    v-model="selectedSortingOption"
                    :items="sortingOptions"
                    label="Sort By"
                    item-value="value"
                    item-title="title"
                    density="comfortable"
                    variant="outlined"
                    chips
                    clearable/>
            </v-col>
        </v-row>
    </div>
</template>