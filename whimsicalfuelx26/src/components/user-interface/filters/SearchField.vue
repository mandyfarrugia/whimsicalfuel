<script setup>
    defineProps({
        label: String,
        modelValue: String
    });

    const emit = defineEmits(['update:modelValue']);
</script>
<template>
    <v-text-field
        :model-value="modelValue"
        :label="label"
        prepend-inner-icon="mdi-magnify"
        density="comfortable"
        variant="outlined"
        item-title="title"
        item-value="value"
        clearable
        @update:model-value="emit('update:modelValue', $event)"
    />
</template>