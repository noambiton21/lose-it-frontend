import { takeLatest, put } from "redux-saga/effects";
import {
  displayLoginError,
  displayRegisterError,
  loggedIn,
  userLoaded,
} from "../features/user/userSlice";
import * as userService from "../services/user.service";
import { sagaActions } from "./sagaActions";

function* login(action) {
  const { email, password } = action.payload;

  try {
    const resToken = yield userService.login(email, password);

    localStorage.setItem("token", resToken.token);
    window.location.href = "/";
  } catch (ex) {
    yield put(displayLoginError());
  }
}

function* logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

function* register(action) {
  const { email, password } = action.payload;

  try {
    const resData = yield userService.register(email, password);

    localStorage.setItem("token", resData.token);
    window.location.href = "/";
  } catch (ex) {
    yield put(displayRegisterError());
  }
}

function* onboard(action) {
  try {
    yield userService.onboard(action.payload);
    window.location.href = "/";
  } catch (ex) {
    yield;
  }
}

function* getUserData() {
  try {
    const token = localStorage.getItem("token");
    let user = undefined;

    if (token) {
      user = yield userService.getUser();
    }
    if (user) {
      yield put(loggedIn(user));
      yield put({ type: sagaActions.FETCH_WEIGHT_HISTORY });
      yield put({ type: sagaActions.FETCH_WORKOUT });
      yield put({ type: sagaActions.FETCH_MEAL_OPTIONS });
      yield put({ type: sagaActions.FETCH_TOTAL_DAY_CALORIES });
      yield put({ type: sagaActions.FETCH_TODAY_MEALS });
    }
  } finally {
    yield put(userLoaded());
  }
}

export default function* userSaga() {
  yield takeLatest(sagaActions.LOGIN, login);
  yield takeLatest(sagaActions.REGISTER, register);
  yield takeLatest(sagaActions.GET_USER, getUserData);
  yield takeLatest(sagaActions.ONBOARD_USER, onboard);
  yield takeLatest(sagaActions.LOGOUT, logout);
}
