<script setup>
    import { reactive } from 'vue';
    import ReusableForm from '../../components/user-interface/forms/ReusableForm.vue';

    const measurements = [
        { 
            title: 'grams',
            value: 'g'
        },
        {
            title: 'ounces',
            value: 'oz'
        },
        {
            title: 'millilitres',
            value: 'ml'
        },
        {
            title: 'teaspoon',
            value: 'tsp'
        },
        {
            title: 'tablespoon',
            value: 'tbsp'
        },
        {
            title: 'cup',
            value: 'cup'
        }
    ];

    const measurementOptions = measurements.map((measurement) => ({
        title: `${measurement.title} (${measurement.value})`,
        value: measurement.value
    }));

    const addNewRecipeForm = reactive({
        title: '',
        ingredients: [
            {
                item: '',
                amount: '',
                measurement: null
            }

        ]
    });

    const addIngredient = () => {
        addNewRecipeForm.ingredients.push({
            item: '',
            amount: '',
            measurement: null
        })
    };

    const removeIngredient = (index) => {
        addNewRecipeForm.ingredients.splice(index, 1);
    }
</script>
<template>
    <div class="w-100 pa-4 pt-10">
        <ReusableForm
            title="Add a new recipe"
            button-text="Add new recipe">
            <template #form-content>
                <v-text-field label="Title" density="comfortable" variant="outlined"/>
                <div v-for="(ingredient, index) in addNewRecipeForm.ingredients" class="ingredient-fieldset d-flex flex-column pa-4 mb-4 mb-2">
                    <p class="text-subtitle-1 font-weight-bold mb-3">Ingredient {{ index + 1 }}</p>
                    <v-row align="center" :class="{ 'mb-2' : !index === addNewRecipeForm.ingredients.length - 1 }">
                        <v-col :cols="(index === addNewRecipeForm.ingredients.length - 1) ? 10 : 12">
                            <v-text-field v-model="ingredient.item" label="Item" density="comfortable" variant="outlined" hide-details="auto"></v-text-field>
                        </v-col>
                        <v-col v-if="index === addNewRecipeForm.ingredients.length - 1" cols="2" class="d-flex align-center justify-center">
                            <v-btn
                            @click="addIngredient" icon="mdi-plus" color="primary" class="text-white" elevation="3" size="default"></v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="ingredient.amount" label="Amount" density="comfortable" variant="outlined" hide-details="auto"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-select v-model="ingredient.measurement" :items="measurementOptions" item-title="title" item-value="value" label="Measurement" density="comfortable" variant="outlined" hide-details="auto"></v-select>
                        </v-col>
                    </v-row>
                    <div v-if="addNewRecipeForm.ingredients.length > 1" class="d-flex justify-end mt-4">
                        <v-btn @click="removeIngredient(index)" prepend-icon="mdi-delete" color="error" variant="text">Remove ingredient</v-btn>
                    </div>
                </div>
            </template>
        </ReusableForm>
    </div>
</template>
<style scoped>
    .ingredient-fieldset {
        border: 1px solid rgb(var(--v-theme-outline));
        border-radius: 16px;
        background-color: rgba(var(--v-theme-surface-variant), 0.55);
    }
</style>