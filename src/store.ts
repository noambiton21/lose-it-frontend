import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/user/userSlice";
import createSagaMiddleware from "redux-saga";
import userSaga from "./sagas/user.saga";
import weightHistorySaga from "./sagas/weightHistory.saga";
import workoutSaga from "./sagas/workout.saga";
import mealSaga from "./sagas/meal.saga";
import { weightHistorySlice } from "./features/user/weightHistorySlice";
import { dialogSlice } from "./features/user/dialogSlice";
import { mealSlice } from "./features/user/mealSlice";
import { dayCaloriesSlice } from "./features/user/dayCaloriesSlice";
import { workoutSlice } from "./features/user/workoutSlice";
import { todayMealsSlice } from "./features/user/todayMealsSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    weightHistory: weightHistorySlice.reducer,
    dialog: dialogSlice.reducer,
    meal: mealSlice.reducer,
    dayCalories: dayCaloriesSlice.reducer,
    todayMeals: todayMealsSlice.reducer,
    workout: workoutSlice.reducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(userSaga as any);
sagaMiddleware.run(weightHistorySaga as any);
sagaMiddleware.run(mealSaga as any);
sagaMiddleware.run(workoutSaga as any);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
