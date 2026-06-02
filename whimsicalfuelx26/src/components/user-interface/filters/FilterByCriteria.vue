<script setup>
    defineProps({
        modelValue: String,
        filterOptions: Array,
        label: String,
    });

    const emit = defineEmits(['update:modelValue']);
</script>
<template>
    <v-select
        :model-value="modelValue"
        prepend-inner-icon="mdi-filter"
        :items="filterOptions"
        :label="label"
        density="comfortable"
        variant="outlined"
        clearable
        @update:model-value="emit('update:modelValue', $event)"/>
</template>