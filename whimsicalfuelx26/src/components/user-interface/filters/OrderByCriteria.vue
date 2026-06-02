<script setup>
    defineProps({
        label: String,
        modelValue: String,
        sortingOptions: Array
    });

    const emit = defineEmits(['update:modelValue']);
</script>
<template>
    <v-select
        :model-value="modelValue"
        :items="sortingOptions"
        :label="label"
        prepend-inner-icon="mdi-sort"
        item-value="value"
        item-title="title"
        density="comfortable"
        variant="outlined"
        chips
        clearable
        @update:model-value="emit('update:modelValue', $event)"/>
</template>