import { takeLatest, put, call } from "redux-saga/effects";
import {
  mealOptionsLoading,
  mealOptionsLoaded,
  mealOptionsError,
} from "../features/user/mealSlice";
import {
  dayCaloriesLoaded,
  dayCaloriesLoading,
  displayDayCaloriesError,
} from "../features/user/dayCaloriesSlice";
import {
  getTotalDayCalories,
  getMealsCalories,
} from "../services/meal.service";
import { sagaActions } from "./sagaActions";

// const date = new Date().toLocaleDateString("en-GB");

function* fetch(action) {
  try {
    yield put(mealOptionsLoading());
    const mealOptions = yield getMealsCalories(action.payload);
    yield put(mealOptionsLoaded(mealOptions));
  } catch (ex) {
    yield put(mealOptionsError());
  }
}

function* fetchTotalDayCalories() {
  try {
    yield put(dayCaloriesLoading());
    const totalDayCalories = yield getTotalDayCalories();
    yield put(dayCaloriesLoaded(totalDayCalories));
  } catch (ex) {
    yield put(displayDayCaloriesError());
  }
}

export default function* mealSaga() {
  yield takeLatest(sagaActions.FETCH_MEAL_OPTIONS, fetch);
  yield takeLatest(sagaActions.FETCH_TOTAL_DAY_CALORIES, fetchTotalDayCalories);
  //   yield takeLatest(sagaActions.ADD_MEAL, add);
}

// function* add(action) {
//   try {
//     yield addMealOptions(action.payload);
//   } catch (ex) {
//     yield;
//   }
// }
