<script setup>
    import { ref, computed, normalizeClass, reactive, onMounted } from "vue";
    import { useAnimationHelper } from '../../composables/useAnimationHelper.js';
    import ReusableForm from "../../components/user-interface/forms/ReusableForm.vue";
    import OrDivider from "../../components/user-interface/dividers/OrDivider.vue";
    import { useVuelidate } from "@vuelidate/core";
    import { required, email, helpers, minValue } from "@vuelidate/validators";
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
    import { mealPeriods } from "../../data/mealPeriods.js";
    import { useSnackbar } from "vue3-snackbar";
    import { useCustomFileUploadValidation } from "../../composables/useCustomFileUploadValidation.js";
    import { useCustomLinkValidator } from "../../composables/useCustomLinkValidator.js";
    import { convertYouTubeLinkToEmbedLink } from "../../services/linkToEmbedConversion.js";
    import { useRecipesPiniaStore } from "../../stores/recipesPiniaStore.js";

    const snackbar = useSnackbar();
    const lastSavedDraftSnapshot = ref('');

    const RECIPE_DRAFT_KEY = '887e86259b2fbe4be65c9fd2fa7014f900408948';

    onMounted(() => {
        fetchRecipeDrafts();
    });

    const { getErrorAnimationClass } = useAnimationHelper();
    const { isFileUploadSizeValid } = useCustomFileUploadValidation();
    const { isValidUrl, isValidVideoLink } = useCustomLinkValidator();
    const recipesPiniaStore = useRecipesPiniaStore();

    const measurements = [
        {
            title: "grams",
            value: "g",
            type: "weight"
        },
        {
            title: "ounces",
            value: "oz",
            type: "weight"
        },
        {
            title: "millilitres",
            value: "ml",
            type: "volume"
        },
        {
            title: "teaspoon",
            value: "tsp",
            type: "volume"
        },
        {
            title: "tablespoon",
            value: "tbsp",
            type: "volume"
        },
        {
            title: "cup",
            value: "cup",
            type: "volume"
        }
    ];

    const convertAmount = (amount, fromMeasurement, toMeasurement) => {
        const numericAmount = Number(amount);
        if(Number.isNaN(numericAmount)) return amount;

        const conversionsToBase = {
            g: 1,
            oz: 28.3495,
            ml: 1,
            tsp: 5,
            tbsp: 15,
            cup: 240
        };

        const amountInBaseUnit = numericAmount * conversionsToBase[fromMeasurement];
        const convertedAmount = amountInBaseUnit / conversionsToBase[toMeasurement];
        return Number(convertedAmount.toFixed(2));
    };

    const getMeasurementByValue = (value) => {
        return measurements.find(measurement => measurement.value === value);
    };

    const canConvertMeasurement = (fromMeasurement, toMeasurement) => {
        const from = getMeasurementByValue(fromMeasurement);
        const to = getMeasurementByValue(toMeasurement);
        if(!from || !to) return false;
        return from.type === to.type;
    };

    const measurementOptions = measurements.map((measurement) => ({
        title: `${measurement.title} (${measurement.value})`,
        value: measurement.value,
    }));

    const addNewRecipeForm = reactive({
        title: '',
        calories: '',
        mealPeriods: null,
        servings: '',
        ingredients: [
            {
                item: '',
                amount: '',
                measurement: null,
                measurementConversionError: '',
                additionalRemarks: '',
                dirty: {
                    item: false,
                    amount: false,
                    measurement: false,
                },
            },
        ],
        recipe: [
            {
                instruction: '',
                dirty: {
                    instruction: false
                }
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
        attachments: {
            link: '',
            video: null
        },
        additionalRemarks: ''
    });

    const validationRules = computed(() => ({
        title: {
            required: helpers.withMessage("Title is required!", required),
        },
        calories: {
            required: helpers.withMessage('Calories are required!', required),
            minValue: helpers.withMessage(
                ({ $params }) => `Calories must be at least ${$params.min} kcal!`,
                minValue(0)
            )
        },
        servings: {
            required: helpers.withMessage('Servings are required!', required),
            minValue: helpers.withMessage(
                ({ $params }) => `Serving must be at least ${$params.min}!`,
                minValue(1)
            )
        },
        mealPeriods: {
            required: helpers.withMessage('At least one meal period is required!', required)
        },
        ingredients: {
            $each: helpers.forEach({
                item: {
                    required: helpers.withMessage("Item is required!", required),
                },
                amount: {
                    minValue: helpers.withMessage(
                        ({ $params }) => `Amount must be at least ${$params.min}!`,
                        minValue(0)
                    )
                },
            })
        },
        recipe: {
            $each: helpers.forEach({
                instruction: {
                    required: helpers.withMessage("Instruction is required!", required)
                }
            })
        },
        attachments: {
            link: {
                isValidUrl,
                isValidVideoLink
            },
            video: {
                isFileUploadSizeValid: isFileUploadSizeValid(25)
            }
        }
    }));

    const v$ = useVuelidate(validationRules, addNewRecipeForm);

    const validationErrors = computed(() => ({
        title: !v$.value.title.$dirty
            ? []
            : v$.value.title.$errors.map((error) => error.$message),
        calories: !v$.value.calories.$dirty
            ? []
            : v$.value.calories.$errors.map((error) => error.$message),
        mealPeriods: !v$.value.mealPeriods.$dirty
            ? []
            : v$.value.mealPeriods.$errors.map((error) => error.$message),
        servings: !v$.value.servings.$dirty
            ? []
            : v$.value.servings.$errors.map((error) => error.$message),
        attachments: {
            link: !v$.value.attachments.link.$dirty
                ? []
                : v$.value.attachments.link.$errors.map((error) => error.$message),
            video: !v$.value.attachments.video.$dirty
                ? []
                : v$.value.attachments.video.$errors.map((error) => error.$message)
        }
    }));

    const nutrientSourceGroups = {
        proteinSources: proteinSources,
        fibreSources: fibreSources,
        calciumSources: calciumSources,
        vitaminASources: vitaminASources,
        vitaminBSources: vitaminBSources,
        vitaminCSources: vitaminCSources,
        vitaminDSources: vitaminDSources,
        vitaminKSources: vitaminKSources,
        healthyFatSources: healthyFatSources,
        magnesiumSources: magnesiumSources,
        carbohydrateSources: carbohydrateSources
    };

    const doesIngredientMatchSource = (ingredient, source) => {
        const normalisedIngredientName = ingredient.trim().toLowerCase();
        const normalisedSourceValue = source.value.trim().toLowerCase();

        if(normalisedSourceValue === normalisedIngredientName) return true;
        if(!Array.isArray(source.aliases)) return false;

        return source.aliases.some((alias) => {
            return alias.trim().toLowerCase() === normalisedIngredientName;
        })
    }

    const autoPopulateNutrientSourcesFromIngredient = (ingredient) => {
        if(!ingredient) return;

        for(const nutrientKey in nutrientSourceGroups) {
            const sourceOptions = nutrientSourceGroups[nutrientKey];
            const selectedSources = addNewRecipeForm.nutrientSources[nutrientKey];

            if(!Array.isArray(selectedSources) || !Array.isArray(sourceOptions)) continue;
            
            const matchingSource = sourceOptions.find((source) => {
                return doesIngredientMatchSource(ingredient, source);
            });

            if(matchingSource && !selectedSources.includes(matchingSource.value)) {
                selectedSources.push(matchingSource.value);
            }
        }
    };

    const getIngredientErrorMessages = (index, fieldName) => {
        const ingredient = addNewRecipeForm.ingredients[index];
        if(!ingredient || !ingredient.dirty || !ingredient.dirty[fieldName]) return [];
        const fieldErrors = v$.value.ingredients.$each.$response.$errors[index]?.[fieldName];
        if(!fieldErrors) return [];
        return fieldErrors.map((error) => error.$message);
    };

    const getInstructionErrorMessages = (index, fieldName) => {
        const recipe = addNewRecipeForm.recipe[index];
        if(!recipe || !recipe.dirty || !recipe.dirty[fieldName]) return [];
        const fieldErrors = v$.value.recipe.$each.$response.$errors[index]?.[fieldName];
        if(!fieldErrors) return [];
        return fieldErrors.map((error) => error.$message);
    }

    const addIngredient = () => {
        addNewRecipeForm.ingredients.push({
            item: '',
            amount: '',
            measurement: null,
            measurementConversionError: '',
            additionalRemarks: '',
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

    const markInstructionFieldAsDirty = (index, inputElementName) => {
        const recipe = addNewRecipeForm.recipe[index];
        if (!recipe || !recipe.dirty) return;
        recipe.dirty[inputElementName] = true;
    };

    const removeIngredient = (index) => {
        addNewRecipeForm.ingredients.splice(index, 1);
    };

    const addRecipe = () => {
        addNewRecipeForm.recipe.push({
            instruction: '',
            dirty: {
                instruction: false
            }
        });
    };

    const removeStep = (index) => {
        addNewRecipeForm.recipe.splice(index, 1);
    };

    const changeIngredientMeasurement = (index, newMeasurement) => {
        const ingredient = addNewRecipeForm.ingredients[index];
        if(!ingredient) return;
        const oldMeasurement = ingredient.measurement;
        ingredient.measurementConversionError = '';

        if(ingredient.amount && oldMeasurement && newMeasurement && !canConvertMeasurement(oldMeasurement, newMeasurement)) {
            ingredient.measurementConversionError = 'Cannot automatically convert between weight and volume measurements! Please update the amount manually!';
            ingredient.measurement = newMeasurement;
            return;
        }

        if(ingredient.amount && oldMeasurement && newMeasurement && canConvertMeasurement(oldMeasurement, newMeasurement)) {
            ingredient.amount = convertAmount(ingredient.amount, oldMeasurement, newMeasurement);
        }

        ingredient.measurement = newMeasurement;
    };

    const getDraftDataForTemporaryStorage = () => {
        return {
            ...addNewRecipeForm,
            attachments: {
                ...addNewRecipeForm.attachments,
                video: null
            }
        }
    };

    const getDraftDataSnapshot = () => {
        return JSON.stringify(getDraftDataForTemporaryStorage());
    }

    const canSaveDraft = computed(() => {
        const hasChangesSinceLastSave = getDraftDataSnapshot() !== lastSavedDraftSnapshot.value;
        return hasChangesSinceLastSave && v$.value.$errors.length === 0;
    });

    const saveRecipeDraft = () => {
        const draftRecipeData = getDraftDataSnapshot();
        localStorage.setItem(RECIPE_DRAFT_KEY, draftRecipeData);
        lastSavedDraftSnapshot.value = draftRecipeData;
    
        snackbar.add({
            'type': 'success',
            'text': 'Draft has been saved successfully!',
            'dismissible': true,
            'duration': 5000
        });
    };

    const fetchRecipeDrafts = () => {
        const savedRecipeDraftData = localStorage.getItem(RECIPE_DRAFT_KEY);
        
        if(!savedRecipeDraftData) {
            lastSavedDraftSnapshot.value = getDraftDataSnapshot();
            return;
        }

        const parsedRecipeDraftData = JSON.parse(savedRecipeDraftData);
        Object.assign(addNewRecipeForm, parsedRecipeDraftData);

        addNewRecipeForm.ingredients = addNewRecipeForm.ingredients.map((ingredient) => ({
            item: ingredient.item || '',
            amount: ingredient.amount || '',
            measurement: ingredient.measurement || null,
            measurementConversionError: ingredient.measurementConversionError || '',
            additionalRemarks: ingredient.additionalRemarks || '',
            dirty: {
                item: false,
                amount: false,
                measurement: false
            }
        }));

        addNewRecipeForm.recipe = addNewRecipeForm.recipe.map((step) => ({
            instruction: step.instruction || '',
            dirty: {
                instruction: false
            }
        }));

        lastSavedDraftSnapshot.value = getDraftDataSnapshot();
    };

    const hasInsertedEmbedLink = computed(() => {
        return (addNewRecipeForm.attachments.link || '').trim().length > 0;
    });

    const hasUploadedVideo = computed(() => {
        const video = addNewRecipeForm.attachments.video;
        if(!video) return false;
        if(Array.isArray(video)) return video.length > 0;
        return true;
    });

    const clearUploadedVideo = () => {
        addNewRecipeForm.attachments.video = null;
    };

    const clearVideoLink = () => {
        addNewRecipeForm.attachments.link = '';
    };

    const submitNewRecipe = async () => {
        const isFormValid = await v$.value.$validate();
        if(!isFormValid) return;

        if(!hasInsertedEmbedLink.value && !hasUploadedVideo.value) {
            snackbar.add({
                'type': 'error',
                'text': 'Please insert either a YouTube link or upload a video',
                'dismissible': true,
                'duration': 5000
            });

            return;
        }

        try {
            const videoEmbedLink = convertYouTubeLinkToEmbedLink(addNewRecipeForm.attachments.link);
            const videoFile = Array.isArray(addNewRecipeForm.attachments.video) ? addNewRecipeForm.attachments.video[0] : addNewRecipeForm.attachments.video;
            
            const recipeToSave = {
                title: addNewRecipeForm.title,
                calories: Number(addNewRecipeForm.calories),
                mealPeriods: addNewRecipeForm.mealPeriods || [],
                servings: addNewRecipeForm.servings,
                ingredients: addNewRecipeForm.ingredients.map((ingredient) => ({
                    item: ingredient.item,
                    amount: Number(ingredient.amount),
                    measurement: ingredient.measurement || null,
                    additionalRemarks: ingredient.additionalRemarks || null
                })),
                recipe: addNewRecipeForm.recipe.map((step) => ({
                    instruction: step.instruction
                })),
                nutrientSources: addNewRecipeForm.nutrientSources,
                attachments: {
                    videoSourceType: videoEmbedLink ? 'link' : videoFile ? 'upload' : null,
                    videoLink: videoEmbedLink || null,
                    uploadedVideoFile: videoFile || null
                },
                additionalRemarks: addNewRecipeForm.additionalRemarks || null
            };

            await recipesPiniaStore.addNewRecipe(recipeToSave);
            localStorage.removeItem(RECIPE_DRAFT_KEY);
        } catch(error) {
            console.error(error);
        }
    };
</script>
<template>
  <div class="w-100 pa-4 pt-10">
    <ReusableForm title="Add a new recipe" button-colour="primary" button-text="Add new recipe" :disabled-based-on="v$.$invalid" @submit="submitNewRecipe">
      <template #form-content>
        <v-text-field
            v-model="addNewRecipeForm.title"
            :class="[getErrorAnimationClass(v$.title)]"
            :error="v$.title.$error"
            :error-messages="validationErrors.title"
            label="Title"
            class="mb-4"
            prepend-inner-icon="mdi-format-title"
            density="comfortable"
            variant="outlined"
            clearable
            @blur="v$.title.$touch()"
            hide-details="auto"
        />
        <v-text-field
            v-model="addNewRecipeForm.calories"
            :class="[getErrorAnimationClass(v$.calories)]"
            :error="v$.calories.$error"
            :error-messages="validationErrors.calories"
            class="mb-4"
            label="Calories"
            prepend-inner-icon="mdi-fire-circle"
            type="number"
            density="comfortable"
            variant="outlined"
            clearable
            @blur="v$.calories.$touch()"
            hide-details="auto"/>
        <v-select
            v-model="addNewRecipeForm.mealPeriods"
            label="Meal Period"
            :error="v$.mealPeriods.$error"
            :error-messages="validationErrors.mealPeriods"
            :items="mealPeriods"
            class="mb-4"
            prepend-inner-icon="mdi-clock-time-eight-outline"
            density="comfortable"
            variant="outlined"
            multiple
            chips
            clearable
            hide-details="auto"
            @blur="v$.mealPeriods.$touch()">
        </v-select>
        <v-text-field
            v-model="addNewRecipeForm.servings"
            :class="[getErrorAnimationClass(v$.servings)]"
            :error="v$.servings.$error"
            :error-messages="validationErrors.servings"
            class="mb-4"
            label="Servings"
            prepend-inner-icon="mdi-account-group"
            type="number"
            density="comfortable"
            variant="outlined"
            clearable
            @blur="v$.servings.$touch()"
            hide-details="auto"/>
        <v-expansion-panels class="mb-4">
            <v-expansion-panel>
                <v-expansion-panel-title class="text-subtitle-1 font-weight-bold"><v-icon class="mx-3" icon="mdi-food-apple"></v-icon> Ingredients</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div
                        v-for="(ingredient, index) in addNewRecipeForm.ingredients"
                        class="ingredient-fieldset d-flex flex-column pa-4 mb-4"
                        :key="index"
                        >
                        <p class="text-subtitle-1 font-weight-bold mb-3">
                            Ingredient {{ index + 1 }}
                        </p>
                        <v-row
                            align="center"
                            :class="{
                            'mb-2': index !== addNewRecipeForm.ingredients.length - 1
                            }"
                        >
                            <v-col
                            :cols="
                                index === addNewRecipeForm.ingredients.length - 1 ? 10 : 12
                            "
                            >
                            <v-text-field
                                v-model="ingredient.item"
                                :error-messages="getIngredientErrorMessages(index, 'item')"
                                label="Item"
                                density="comfortable"
                                variant="outlined"
                                hide-details="auto"
                                @blur="() => { markIngredientFieldAsDirty(index, 'item'); autoPopulateNutrientSourcesFromIngredient(ingredient.item) }"
                                clearable
                            ></v-text-field>
                            </v-col>
                            <v-col
                            v-if="index === addNewRecipeForm.ingredients.length - 1"
                            cols="2"
                            class="d-flex justify-end mt-2"
                            >
                            <v-btn
                                @click="addIngredient"
                                icon="mdi-plus"
                                color="primary"
                                class="text-white"
                                elevation="3"
                                rounded="circle"
                            ></v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                            <v-text-field
                                v-model="ingredient.amount"
                                type="number"
                                :error-messages="getIngredientErrorMessages(index, 'amount')"
                                label="Amount"
                                density="comfortable"
                                variant="outlined"
                                hide-details="auto"
                                @blur="markIngredientFieldAsDirty(index, 'amount')"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="7">
                            <v-select
                                :model-value="ingredient.measurement"
                                :items="measurementOptions"
                                item-title="title"
                                item-value="value"
                                label="Measurement (Optional)"
                                density="comfortable"
                                prepend-inner-icon="mdi-scale"
                                variant="outlined"
                                hide-details="auto"
                                :error-messages="ingredient.measurementConversionError ? [ingredient.measurementConversionError] : []"
                                @update:model-value="changeIngredientMeasurement(index, $event)"
                            ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-textarea
                                v-model="ingredient.additionalRemarks"
                                label="Additional remarks"
                                hide-details="auto"
                                auto-grow
                                clearable
                                density="comfortable"
                                variant="outlined"></v-textarea>
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
                <v-expansion-panel-title class="text-subtitle-1 font-weight-bold"><v-icon class="mx-3" icon="mdi-progress-helper"></v-icon> Recipe</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div
                        v-for="(step, index) in addNewRecipeForm.recipe"
                        class="recipe-fieldset d-flex flex-column pa-4 mb-4"
                        :key="index"
                        >
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
                            <v-textarea
                                v-model="step.instruction"
                                :error-messages="getInstructionErrorMessages(index, 'instruction')"
                                label="Instruction"
                                density="comfortable"
                                variant="outlined"
                                hide-details="auto"
                                @blur="markInstructionFieldAsDirty(index, 'instruction')"
                                clearable
                                auto-grow
                            ></v-textarea>
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
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels class="mb-4">
          <v-expansion-panel>
            <v-expansion-panel-title class="text-subtitle-1 font-weight-bold"><v-icon class="mx-3" icon="mdi-food-variant"></v-icon> Nutrient Sources</v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="macronutrient-sources-fieldset d-flex flex-column pa-4 mb-4">
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
                        label="Sources of Magnesium"
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
                        label="Sources of Carbohydrates"
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
                <div class="micronutrient-sources-fieldset d-flex flex-column pa-4 mb-4">
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
                        hide-details="auto">
                    </v-select>
                </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels class="mb-4">
            <v-expansion-panel>
                <v-expansion-panel-title class="text-subtitle-1 font-weight-bold"><v-icon class="mx-3" icon="mdi-paperclip"></v-icon> Attachments</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div class="attachments-fieldset d-flex flex-column pa-4 mb-4">
                        <v-icon icon="mdi-youtube"></v-icon>
                        <p class="text-subtitle-1 font-weight-bold mb-3">Link</p>
                        <v-text-field
                            v-model="addNewRecipeForm.attachments.link"
                            class="mb-3"
                            label="Link to YouTube Video"
                            density="comfortable"
                            variant="outlined"
                            clearable
                            :disabled="hasUploadedVideo"
                            @click:clear="clearVideoLink"
                            :error="v$.attachments.link.$error"
                            :error-messages="validationErrors.attachments.link"
                            @blur="v$.attachments.link.$touch()"
                            hide-details="auto"/>
                    </div>
                    <OrDivider></OrDivider>
                    <div class="attachments-fieldset d-flex flex-column pa-4 mb-4">
                        <v-icon icon="mdi-folder-play"></v-icon>
                        <p class="text-subtitle-1 font-weight-bold mb-3">Upload Video</p>
                        <v-file-upload
                            v-model="addNewRecipeForm.attachments.video"
                            title="Drag and drop a recipe video here (Optional)"
                            class="mb-3"
                            divider-text="or"
                            browse-text="Browse Files"
                            accept="video/*"
                            density="default"
                            clearable
                            :disabled="hasInsertedEmbedLink"
                            @click:clear="clearUploadedVideo"
                            :error="v$.attachments.video.$error"
                            :error-messages="validationErrors.attachments.video"
                            @update:model-value="v$.attachments.video.$touch()"
                            hide-details="auto"/>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-textarea
            v-model="addNewRecipeForm.additionalRemarks"
            label="Any additional remarks?"
            class="mb-3"
            prepend-inner-icon="mdi-comment-text-multiple-outline"
            density="comfortable"
            variant="outlined"
            clearable
            hide-details="auto"
            auto-grow>
        </v-textarea>
        <v-btn
            color="secondary"
            prepend-icon="mdi-content-save"
            rounded="pill"
            variant="tonal"
            :disabled="!canSaveDraft"
            @click="saveRecipeDraft">Save draft
        </v-btn>
      </template>
    </ReusableForm>
  </div>
</template>
<style scoped>
    .recipe-fieldset,
    .ingredient-fieldset,
    .macronutrient-sources-fieldset,
    .micronutrient-sources-fieldset,
    .attachments-fieldset {
        border: 1px solid rgb(var(--v-theme-outline));
        border-radius: 16px;
        background-color: rgba(var(--v-theme-surface-variant), 0.55);
    }
</style>