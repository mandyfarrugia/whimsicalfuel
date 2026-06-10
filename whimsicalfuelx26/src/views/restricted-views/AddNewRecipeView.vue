<script setup>
    import { computed, normalizeClass, reactive } from "vue";
    import ReusableForm from "../../components/user-interface/forms/ReusableForm.vue";
    import { useVuelidate } from "@vuelidate/core";
    import { required, email, helpers } from "@vuelidate/validators";
    import {
        proteinSources,
        calciumSources,
        fibreSources,
        healthyFatSources,
        magnesiumSources,
        carbohydrateSources,
        vitaminASources,
        vitaminBSources,
        vitaminCSources,
        vitaminDSources,
        vitaminKSources,
    } from "../../data/nutrientSources.js";

    const measurements = [
    {
        title: "grams",
        value: "g",
    },
    {
        title: "ounces",
        value: "oz",
    },
    {
        title: "millilitres",
        value: "ml",
    },
    {
        title: "teaspoon",
        value: "tsp",
    },
    {
        title: "tablespoon",
        value: "tbsp",
    },
    {
        title: "cup",
        value: "cup",
    },
    ];

    const measurementOptions = measurements.map((measurement) => ({
    title: `${measurement.title} (${measurement.value})`,
    value: measurement.value,
    }));

    const addNewRecipeForm = reactive({
    title: "",
    ingredients: [
        {
        item: "",
        amount: "",
        measurement: null,
        dirty: {
            item: false,
            amount: false,
            measurement: false,
        },
        },
    ],
    recipe: [
        {
        instruction: "",
        },
    ],
    nutrientSources: {
        proteinSources: [],
        calciumSources: [],
        fibreSources: [],
        healthyFatSources: [],
        magnesiumSources: [],
        carbohydrateSources: [],
        vitaminASources: [],
        vitaminBSources: [],
        vitaminCSources: [],
        vitaminDSources: [],
        vitaminKSources: [],
    },
    });

    const validationRules = computed(() => ({
    title: {
        required: helpers.withMessage("Title is required!", required),
    },
    ingredients: {
        $each: helpers.forEach({
        item: {
            required: helpers.withMessage("Item is required!", required),
        },
        amount: {
            required: helpers.withMessage("Amount is required!", required),
        },
        }),
    },
    }));

    const v$ = useVuelidate(validationRules, addNewRecipeForm, {
        $autoDirty: true,
    });

    const validationErrors = computed(() => ({
        title: !v$.value.title.$dirty
            ? []
            : v$.value.title.$errors.map((error) => error.$message),
    }));

    const ingredientErrorMessages = computed(() => {
    const errors = v$.value.ingredients.$each.$response.$errors;

    return addNewRecipeForm.ingredients.map((ingredient, index) => ({
        item: !ingredient.dirty.item
            ? []
            : errors[index]?.item?.map((error) => error.$message) || [],
        amount: !ingredient.dirty.amount
            ? []
            : errors[index]?.amount?.map((error) => error.$message) || [],
        }));
    });

    const addIngredient = () => {
        addNewRecipeForm.ingredients.push({
            item: "",
            amount: "",
            measurement: null,
            dirty: {
            item: false,
            amount: false,
            measurement: false,
            },
        });
    };

    const markIngredientFieldAsDirty = (index, inputElementName) => {
        const ingredient = addNewRecipeForm.ingredients[index];
        if (!ingredient || !ingredient.dirty) return;
        ingredient.dirty[inputElementName] = true;
    };

    const removeIngredient = (index) => {
        addNewRecipeForm.ingredients.splice(index, 1);
    };

    const addRecipe = () => {
        addNewRecipeForm.recipe.push({
            instruction: "",
        });
    };

    const removeStep = (index) => {
        addNewRecipeForm.recipe.splice(index, 1);
    };
</script>
<template>
  <div class="w-100 pa-4 pt-10">
    <ReusableForm title="Add a new recipe" button-text="Add new recipe">
      <template #form-content>
        <v-text-field
          v-model="addNewRecipeForm.title"
          :error="v$.title.$error"
          :error-messages="validationErrors.title"
          label="Title"
          density="comfortable"
          variant="outlined"
        />
        <v-expansion-panels class="mb-4">
            <v-expansion-panel>
                <v-expansion-panel-title></v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div
                        v-for="(ingredient, index) in addNewRecipeForm.ingredients"
                        class="ingredient-fieldset d-flex flex-column pa-4 mb-4"
                        >
                        <v-icon icon="mdi-food-apple"></v-icon>
                        <p class="text-subtitle-1 font-weight-bold mb-3">
                            Ingredient {{ index + 1 }}
                        </p>
                        <v-row
                            align="center"
                            :class="{
                            'mb-2': index !== addNewRecipeForm.ingredients.length - 1,
                            }"
                        >
                            <v-col
                            :cols="
                                index === addNewRecipeForm.ingredients.length - 1 ? 10 : 12
                            "
                            >
                            <v-text-field
                                v-model="ingredient.item"
                                :error-messages="ingredientErrorMessages[index]?.item || []"
                                label="Item"
                                density="comfortable"
                                variant="outlined"
                                hide-details="auto"
                                @update:model-value="markIngredientFieldAsDirty(index, 'item')"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            v-if="index === addNewRecipeForm.ingredients.length - 1"
                            cols="2"
                            class="d-flex align-center justify-center"
                            >
                            <v-btn
                                @click="addIngredient"
                                icon="mdi-plus"
                                color="primary"
                                class="text-white"
                                elevation="3"
                                size="default"
                            ></v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                            <v-text-field
                                v-model="ingredient.amount"
                                :error-messages="ingredientErrorMessages[index]?.amount || []"
                                label="Amount"
                                density="comfortable"
                                variant="outlined"
                                hide-details="auto"
                                @update:model-value="
                                markIngredientFieldAsDirty(index, 'amount')
                                "
                            ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                            <v-select
                                v-model="ingredient.measurement"
                                :items="measurementOptions"
                                item-title="title"
                                item-value="value"
                                label="Measurement"
                                density="comfortable"
                                variant="outlined"
                                hide-details="auto"
                            ></v-select>
                            </v-col>
                        </v-row>
                        <div
                            v-if="addNewRecipeForm.ingredients.length > 1"
                            class="d-flex justify-end mt-4"
                        >
                            <v-btn
                            @click="removeIngredient(index)"
                            prepend-icon="mdi-delete"
                            color="error"
                            variant="text"
                            >Remove ingredient</v-btn
                            >
                        </div>
                        </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-expansion-panels class="mb-4">
            <v-expansion-panel>
                <v-expansion-panel-title></v-expansion-panel-title>
                <v-expansion-panel-text></v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        
        <div
          v-for="(step, index) in addNewRecipeForm.recipe"
          class="recipe-fieldset d-flex flex-column pa-4 mb-4"
        >
          <v-icon icon="mdi-progress-helper"></v-icon>
          <p class="text-subtitle-1 font-weight-bold mb-3">
            Step {{ index + 1 }}
          </p>
          <v-row
            align="center"
            :class="{ 'mb-2': index !== addNewRecipeForm.recipe.length - 1 }"
          >
            <v-col
              :cols="index === addNewRecipeForm.recipe.length - 1 ? 10 : 12"
            >
              <v-text-field
                v-model="step.instruction"
                label="Item"
                density="comfortable"
                variant="outlined"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col
              v-if="index === addNewRecipeForm.recipe.length - 1"
              cols="2"
              class="d-flex align-center justify-center"
            >
              <v-btn
                @click="addRecipe"
                icon="mdi-plus"
                color="primary"
                class="text-white"
                elevation="3"
                size="default"
              ></v-btn>
            </v-col>
          </v-row>
          <div
            v-if="addNewRecipeForm.recipe.length > 1"
            class="d-flex justify-end mt-4"
          >
            <v-btn
              @click="removeStep(index)"
              prepend-icon="mdi-delete"
              color="error"
              variant="text"
              >Remove step</v-btn
            >
          </div>
        </div>
        <v-expansion-panels class="mb-4">
          <v-expansion-panel>
            <v-expansion-panel-title>Nutritional sources</v-expansion-panel-title>
            <v-expansion-panel-text>
              <div
                class="macronutrient-sources-fieldset d-flex flex-column pa-4 mb-4"
                >
                <v-icon icon="mdi-food-variant"></v-icon>
                <p class="text-subtitle-1 font-weight-bold mb-3">Macronutrients</p>
                <v-select
                    class="mb-3"
                    label="Sources of Protein"
                    v-model="addNewRecipeForm.nutrientSources.proteinSources"
                    :items="proteinSources"
                    item-title="title"
                    item-value="value"
                    multiple
                    chips
                    clearable
                    density="comfortable"
                    variant="outlined"
                    hide-details="auto"
                >
                </v-select>
                <v-select
                    class="mb-3"
                    label="Sources of Healthy Fats"
                    v-model="addNewRecipeForm.nutrientSources.healthyFatSources"
                    :items="healthyFatSources"
                    item-title="title"
                    item-value="value"
                    multiple
                    chips
                    clearable
                    density="comfortable"
                    variant="outlined"
                    hide-details="auto"
                >
                </v-select>
                <v-select
                    class="mb-3"
                    label="Sources of Magnesium Sources"
                    v-model="addNewRecipeForm.nutrientSources.magnesiumSources"
                    :items="magnesiumSources"
                    item-title="title"
                    item-value="value"
                    multiple
                    chips
                    clearable
                    density="comfortable"
                    variant="outlined"
                    hide-details="auto"
                >
                </v-select>
                <v-select
                    class="mb-3"
                    label="Sources of Carbohydrate Sources"
                    v-model="addNewRecipeForm.nutrientSources.carbohydrateSources"
                    :items="carbohydrateSources"
                    item-title="title"
                    item-value="value"
                    multiple
                    chips
                    clearable
                    density="comfortable"
                    variant="outlined"
                    hide-details="auto"
                >
                </v-select>
                <v-select
                    class="mb-3"
                    label="Sources of Fibre"
                    v-model="addNewRecipeForm.nutrientSources.fibreSources"
                    :items="fibreSources"
                    item-title="title"
                    item-value="value"
                    multiple
                    chips
                    clearable
                    density="comfortable"
                    variant="outlined"
                    hide-details="auto"
                >
                </v-select>
                </div>
                <div
                class="micronutrient-sources-fieldset d-flex flex-column pa-4 mb-4"
                >
                <v-icon icon="mdi-food-variant"></v-icon>
                <p class="text-subtitle-1 font-weight-bold mb-3">Micronutrients</p>
                <v-select
                    class="mb-3"
                    label="Sources of Calcium"
                    v-model="addNewRecipeForm.nutrientSources.calciumSources"
                    :items="calciumSources"
                    item-title="title"
                    item-value="value"
                    multiple
                    chips
                    clearable
                    density="comfortable"
                    variant="outlined"
                    hide-details="auto"
                >
                </v-select>
                <v-select
                    class="mb-3"
                    label="Sources of Vitamin A"
                    v-model="addNewRecipeForm.nutrientSources.vitaminASources"
                    :items="vitaminASources"
                    item-title="title"
                    item-value="value"
                    multiple
                    chips
                    clearable
                    density="comfortable"
                    variant="outlined"
                    hide-details="auto"
                >
                </v-select>
                <v-select
                    class="mb-3"
                    label="Sources of Vitamin B"
                    v-model="addNewRecipeForm.nutrientSources.vitaminBSources"
                    :items="vitaminBSources"
                    item-title="title"
                    item-value="value"
                    multiple
                    chips
                    clearable
                    density="comfortable"
                    variant="outlined"
                    hide-details="auto"
                >
                </v-select>
                <v-select
                    class="mb-3"
                    label="Sources of Vitamin C"
                    v-model="addNewRecipeForm.nutrientSources.vitaminCSources"
                    :items="vitaminCSources"
                    item-title="title"
                    item-value="value"
                    multiple
                    chips
                    clearable
                    density="comfortable"
                    variant="outlined"
                    hide-details="auto"
                >
                </v-select>
                <v-select
                    class="mb-3"
                    label="Sources of Vitamin D"
                    v-model="addNewRecipeForm.nutrientSources.vitaminDSources"
                    :items="vitaminDSources"
                    item-title="title"
                    item-value="value"
                    multiple
                    chips
                    clearable
                    density="comfortable"
                    variant="outlined"
                    hide-details="auto"
                >
                </v-select>
                <v-select
                    class="mb-3"
                    label="Sources of Vitamin K"
                    v-model="addNewRecipeForm.nutrientSources.vitaminKSources"
                    :items="vitaminKSources"
                    item-title="title"
                    item-value="value"
                    multiple
                    chips
                    clearable
                    density="comfortable"
                    variant="outlined"
                    hide-details="auto"
                >
                </v-select>
                </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </ReusableForm>
  </div>
</template>
<style scoped>
    .recipe-fieldset,
    .ingredient-fieldset,
    .macronutrient-sources-fieldset,
    .micronutrient-sources-fieldset {
        border: 1px solid rgb(var(--v-theme-outline));
        border-radius: 16px;
        background-color: rgba(var(--v-theme-surface-variant), 0.55);
    }
</style>