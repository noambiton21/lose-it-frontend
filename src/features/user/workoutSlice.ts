import { createSlice } from "@reduxjs/toolkit";
import { WorkoutsEntry } from "../../types/workout.type";

type WorkoutState = {
  isLoading: boolean;
  hasError: boolean;
  workout?: WorkoutsEntry;
};

const initialState: WorkoutState = {
  isLoading: false,
  hasError: false,
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    displayWorkoutError: (state) => {
      state.hasError = true;
    },
    workoutLoading: (state) => {
      state.isLoading = true;
    },
    workoutLoaded: (state, action) => {
      state.isLoading = false;
      state.workout = action.payload;
    },
  },
});

export const { displayWorkoutError, workoutLoading, workoutLoaded } =
  workoutSlice.actions;
