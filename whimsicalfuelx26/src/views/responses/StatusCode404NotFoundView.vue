<script setup>
    import StateMessageCard from '../../components/user-interface/cards/StateMessageCard.vue';
</script>
<template>
    <div class="w-100 pa-5 pt-10">
        <div class="d-flex flex-wrap ga-4 justify-center">
            <StateMessageCard
                title="Uh oh... Page not found!"
                message="The page you are looking for does not exist or may have been moved.">
                <template #heading>
                    <div class="d-flex justify-center ga-4 mb-10">
                        <div class="not-found-number">4</div>
                        <div class="not-found-number">0</div>
                        <div class="not-found-number">4</div>
                    </div>
                </template>
                <template #actions>
                    <div class="my-5 d-flex align-center">
                        <v-btn color="secondary" variant="elevated" to="/recipes-catalogue">Go Back Home</v-btn>
                    </div>
                </template>
            </StateMessageCard>
        </div>
    </div>
</template>
<style scoped>
    .not-found-number {
        width: 72px;
        height: 72px;
        border-radius: 14px;
        background: #7A9E7E;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        font-weight: 700;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18);
    }
</style>