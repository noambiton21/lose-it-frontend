import axios from "axios";
import {
  MealFood,
  MealFoods,
  MealOptions,
  FoodOptionDetails,
  MealsCalories,
} from "../types/meal.type";
import config from "../config.json";

export const getMealOptions = (): Promise<MealOptions> => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  return axios
    .get(`${config.apiUrl}/meal-options`, {
      headers: {
        Authorization: "Bearer " + storedData.token,
      },
    })
    .then((res) => res.data);
};

export const getFoodOptions = (
  searchTerm: string
): Promise<FoodOptionDetails> => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  return axios
    .get(`${config.apiUrl}/food?query=${searchTerm}`, {
      headers: {
        Authorization: "Bearer " + storedData.token,
      },
    })
    .then((res) => res.data);
};

export const getFoodCalories = (foodName: string): Promise<number> => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  return axios
    .get(`${config.apiUrl}/food-calories?query=${foodName}`, {
      headers: {
        Authorization: "Bearer " + storedData.token,
      },
    })
    .then((res) => res.data);
};

export const addMeal = async (meal: MealFood): Promise<void> => {
  console.log("add meal");
  const storedData = JSON.parse(localStorage.getItem("userData"));
  return axios.post(`${config.apiUrl}/meal`, meal, {
    headers: {
      Authorization: "Bearer " + storedData.token,
    },
  });
};

export const getMeal = (mealType: string, date: string): Promise<MealFoods> => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  return axios
    .get(`${config.apiUrl}/meal?mealType=${mealType}&date=${date}`, {
      headers: {
        Authorization: "Bearer " + storedData.token,
      },
    })
    .then((res) => res.data);
};

export const getMeals = (date: string): Promise<MealFoods> => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  return axios
    .get(`${config.apiUrl}/meals?date=${date}`, {
      headers: {
        Authorization: "Bearer " + storedData.token,
      },
    })
    .then((res) => res.data);
};

export const getMealsCalories = (date: string): Promise<MealsCalories> => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  return axios
    .get(`${config.apiUrl}/mealsCalories?date=${date}`, {
      headers: {
        Authorization: "Bearer " + storedData.token,
      },
    })
    .then((res) => res.data);
};

export const getTotalDayCalories = (): Promise<number> => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  return axios
    .get(`${config.apiUrl}/totalDayCalories`, {
      headers: {
        Authorization: "Bearer " + storedData.token,
      },
    })
    .then((res) => res.data);
};
