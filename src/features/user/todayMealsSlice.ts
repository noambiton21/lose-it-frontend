import { createSlice } from "@reduxjs/toolkit";
import { MealFoods } from "../../types/meal.type";

type todayMealsState = {
  isLoading: boolean;
  hasError: boolean;
  todayMeals?: MealFoods;
};

const initialState: todayMealsState = {
  isLoading: false,
  hasError: false,
};

export const todayMealsSlice = createSlice({
  name: "todayMeals",
  initialState,
  reducers: {
    displayTodayMealsError: (state) => {
      state.hasError = true;
    },
    todayMealsLoading: (state) => {
      state.isLoading = true;
    },
    todayMealsLoaded: (state, action) => {
      state.isLoading = false;
      state.todayMeals = action.payload;
    },
  },
});

export const {
  displayTodayMealsError: displayTodayMealsError,
  todayMealsLoading: todayMealsLoading,
  todayMealsLoaded: todayMealsLoaded,
} = todayMealsSlice.actions;
