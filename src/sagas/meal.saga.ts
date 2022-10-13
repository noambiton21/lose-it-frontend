import { takeLatest, put, call } from "redux-saga/effects";
import {
  mealOptionsLoading,
  mealOptionsLoaded,
  mealOptionsError,
} from "../features/user/mealSlice";
import { getMealOptions } from "../services/meal.service";
import { sagaActions } from "./sagaActions";

function* fetch() {
  try {
    yield put(mealOptionsLoading());
    const mealOptions = yield getMealOptions();
    yield put(mealOptionsLoaded(mealOptions));
  } catch (ex) {
    yield put(mealOptionsError());
  }
}

// function* add(action) {
//   try {
//     yield addMealOptions(action.payload);
//   } catch (ex) {
//     yield;
//   }
// }

export default function* mealSaga() {
  yield takeLatest(sagaActions.FETCH_MEAL_OPTIONS, fetch);
  //   yield takeLatest(sagaActions.ADD_MEAL, add);
}
