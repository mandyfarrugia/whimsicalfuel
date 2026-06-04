<script setup>
    defineProps({
        emoji: String,
        title: String,
        message: String
    });
</script>
<template>
    <v-card
        color="surface"
        rounded="xl"
        elevation="2"
        class="pa-10 d-flex flex-column align-center justify-center text-center mx-auto"
        max-width="520">
            <slot name="heading">
                <span class="state-emoji mb-5">{{ emoji }}</span>
            </slot>
            <p class="state-heading font-weight-bold mb-4">{{ title }}</p>
            <p class="text-body-1 text-medium-emphasis mb-0">{{ message }}</p>
            <slot name="actions"/>
    </v-card>
</template>