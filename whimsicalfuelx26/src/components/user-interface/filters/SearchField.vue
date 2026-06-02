<script setup>
    defineProps({
        label: String,
        searchQuery: String
    });
</script>
<template>
    <v-text-field
        :v-model="searchQuery"
        :label="label"
        prepend-icon="mdi-magnify"
        density="comfortable"
        variant="outlined"
        clearable
    />
</template>