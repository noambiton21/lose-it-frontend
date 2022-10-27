import { createSlice } from "@reduxjs/toolkit";
import { TotalCaloriesEntry } from "../../types/dayCalories.type";

type dayCaloriesState = {
  isLoading: boolean;
  hasError: boolean;
  totalDayCalories?: TotalCaloriesEntry;
};

const initialState: dayCaloriesState = {
  isLoading: false,
  hasError: false,
};

export const dayCaloriesSlice = createSlice({
  name: "dayCalories",
  initialState,
  reducers: {
    displayDayCaloriesError: (state) => {
      state.hasError = true;
    },
    dayCaloriesLoading: (state) => {
      state.isLoading = true;
    },
    dayCaloriesLoaded: (state, action) => {
      state.isLoading = false;
      state.totalDayCalories = action.payload;
    },
  },
});

export const {
  displayDayCaloriesError,
  dayCaloriesLoading,
  dayCaloriesLoaded,
} = dayCaloriesSlice.actions;
