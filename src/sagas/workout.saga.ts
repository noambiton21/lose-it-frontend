import { takeLatest, put, call } from "redux-saga/effects";
import {
  displayWorkoutError,
  workoutLoaded,
  workoutLoading,
} from "../features/user/workoutSlice";
import { getWorkout, addWorkout } from "../services/workout.service";
import { sagaActions } from "./sagaActions";

function* fetch() {
  try {
    yield put(workoutLoading());
    const workout = yield getWorkout();

    yield put(workoutLoaded(workout));
  } catch (ex) {
    yield put(displayWorkoutError());
  }
}

function* add(action) {
  try {
    console.log(action.payload);
    yield addWorkout(action.payload);
    yield call(fetch);
  } catch (ex) {}
}

export default function* userSaga() {
  yield takeLatest(sagaActions.FETCH_WORKOUT, fetch);
  yield takeLatest(sagaActions.ADD_WORKOUT, add);
}
