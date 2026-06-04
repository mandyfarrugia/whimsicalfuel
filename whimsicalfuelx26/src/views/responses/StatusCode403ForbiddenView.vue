<script setup>
    import StateMessageCard from '../../components/user-interface/cards/StateMessageCard.vue';
</script>
<template>
    <div class="w-100 pa-5 pt-10">
        <StateMessageCard
            emoji="⛔"
            title="Code 403: Access Forbidden!"
            message="You have stepped into forbidden territory!">
            <template #actions>
                <div class="my-5 d-flex align-center">
                    <v-btn color="secondary" variant="elevated" to="/recipes-catalogue">Go Back Home</v-btn>
                </div>
            </template>
        </StateMessageCard>
    </div>
</template>