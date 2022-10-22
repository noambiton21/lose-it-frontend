import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MealOptions,MealsCalories } from "../../types/meal.type";

type MealState = {
    isLoadingMealOptions: boolean;
    hasMealOptionsError: boolean;
    mealOptions?: MealsCalories;
}

const initialState: MealState = {
    isLoadingMealOptions: false,
    hasMealOptionsError: false,
}

export const mealSlice = createSlice({
    name: 'meal',
    initialState,
    reducers: {
        mealOptionsLoading: (state) => {
            state.isLoadingMealOptions = true;
        },
        mealOptionsLoaded: (state, action: PayloadAction<MealsCalories>) => {
            state.mealOptions = action.payload;
            state.isLoadingMealOptions = false;
        },
        mealOptionsError: (state) => {
            state.isLoadingMealOptions = false;
            state.hasMealOptionsError = true;
        },
    }
});

export const {
    mealOptionsLoading,
    mealOptionsLoaded,
    mealOptionsError,
} = mealSlice.actions;