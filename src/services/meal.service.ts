import axios from "axios";
import {
  MealFood,
  MealFoods,
  MealOptions,
  FoodOptionDetails,
  MealsCalories,
  FoodDetails,
} from "../types/meal.type";
import config from "../config.json";
import { defaultHeaders } from "../utils/auth";

export const getMealOptions = (): Promise<MealOptions> => {
  return axios
    .get(`${config.apiUrl}/meal-options`, {
      headers: defaultHeaders(),
    })
    .then((res) => res.data);
};

export const getFoodOptions = (
  searchTerm: string
): Promise<FoodOptionDetails> => {
  return axios
    .get(`${config.apiUrl}/food?query=${searchTerm}`, {
      headers: defaultHeaders(),
    })
    .then((res) => res.data);
};

export const getFoodCalories = (foodName: string): Promise<FoodDetails> => {
  return axios
    .get(`${config.apiUrl}/food-calories?query=${foodName}`, {
      headers: defaultHeaders(),
    })
    .then((res) => res.data);
};

export const addMeal = async (meal: MealFood): Promise<void> => {
  return axios.post(`${config.apiUrl}/meal`, meal, {
    headers: defaultHeaders(),
  });
};

export const getMeal = (mealType: string, date: string): Promise<MealFoods> => {
  return axios
    .get(`${config.apiUrl}/meal?mealType=${mealType}&date=${date}`, {
      headers: defaultHeaders(),
    })
    .then((res) => res.data);
};

export const getMeals = (date: string): Promise<MealFoods> => {
  return axios
    .get(`${config.apiUrl}/meals?date=${date}`, {
      headers: defaultHeaders(),
    })
    .then((res) => res.data);
};

export const getMealsCalories = (date: string): Promise<MealsCalories> => {
  return axios
    .get(`${config.apiUrl}/mealsCalories?date=${date}`, {
      headers: defaultHeaders(),
    })
    .then((res) => res.data);
};

export const getTotalDayCalories = (): Promise<number> => {
  return axios
    .get(`${config.apiUrl}/totalDayCalories`, {
      headers: defaultHeaders(),
    })
    .then((res) => res.data);
};
