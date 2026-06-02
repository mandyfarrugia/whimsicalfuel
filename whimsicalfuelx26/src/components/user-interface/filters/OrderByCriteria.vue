<script setup>
    defineProps({
        label: String,
        selectedSortingOption: String,
        sortingOptions: Array
    });
</script>
<template>
    <v-select
        :v-model="model"
        :items="sortingOptions"
        :label="label"
        item-value="value"
        item-title="title"
        density="comfortable"
        variant="outlined"
        chips
        clearable/>
</template>