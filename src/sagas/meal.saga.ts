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
  todayMealsLoading,
  todayMealsLoaded,
  displayTodayMealsError,
} from "../features/user/todayMealsSlice";
import {
  getTotalDayCalories,
  getMealsCalories,
  getMeals,
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

function* fetchTodayMeals() {
  try {
    const date = new Date().toLocaleDateString("en-GB");
    yield put(todayMealsLoading());
    const todayMeals = yield getMeals(date);
    yield put(todayMealsLoaded(todayMeals));
  } catch (ex) {
    yield put(displayTodayMealsError());
  }
}

export default function* mealSaga() {
  yield takeLatest(sagaActions.FETCH_MEAL_OPTIONS, fetch);
  yield takeLatest(sagaActions.FETCH_TOTAL_DAY_CALORIES, fetchTotalDayCalories);
  yield takeLatest(sagaActions.FETCH_TODAY_MEALS, fetchTodayMeals);
}
