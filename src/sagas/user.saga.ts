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
    const resData = yield userService.login(email, password);
    console.log(resData);
    const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: resData.userId,
        token: resData.token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    window.location.href = "/";
  } catch (ex) {
    yield put(displayLoginError());
  }
}

function* logout() {
  localStorage.removeItem("userData");
  window.location.href = "/login";
}

function* register(action) {
  const { email, password } = action.payload;

  try {
    const resData = yield userService.register(email, password);

    const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: resData.userId,
        token: resData.token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
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
    //take the token from localstorage and send in getUser
    const storedData = JSON.parse(localStorage.getItem("userData"));

    let user = false;
    if (storedData) {
      user = yield userService.getUser(storedData.token);
    }
    console.log(user);
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
