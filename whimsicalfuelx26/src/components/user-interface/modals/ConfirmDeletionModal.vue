<script setup>
    const isDeleteModalOpen = defineModel({
        type: Boolean,
        default: false
    });

    const emit = defineEmits(['confirm-delete']);

    const cancelDelete = () => {
        isDeleteModalOpen.value = false;
    };

    const confirmDelete = () => {
        emit('confirm-delete');
        isDeleteModalOpen.value = false;
    };
</script>
<template>
    <v-dialog
        v-model="isDeleteModalOpen"
        max-width="420">
        <v-card
            color="surface"
            rounded="xl"
            elevation="8"
            class="pa-4">
            <div class="d-flex align-center ga-3 mb-4">
                <v-avatar color="error" variant="tonal" size="44">
                    <v-icon icon="mdi-alert-outline"></v-icon>
                </v-avatar>
                <div>
                    <v-card-title class="pa-0 text-h6 font-weight-bold">Confirm deletion</v-card-title>
                </div>
            </div>
            <v-card-text class="pa-0 mb-0">Are you sure you want to delete this recipe?</v-card-text>
            <p class="text-body-2 text-medium-emphasis mb-0">This action is irreversible.</p>
            <v-card-actions class="pa-0 d-flex justify-end ga-2">
                <v-spacer></v-spacer>
                <v-btn
                    variant="tonal"
                    color="secondary"
                    rounded="pill"
                    @click="isDeleteModalOpen = false;">
                    Cancel
                </v-btn>
                <v-btn
                    color="error"
                    variant="elevated"
                    rounded="pill"
                    prepend-icon="mdi-delete"
                    @click="confirmDelete">
                    Delete
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>