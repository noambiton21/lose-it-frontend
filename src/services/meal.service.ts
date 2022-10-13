import axios from "axios";
import {
  MealFood,
  MealFoods,
  MealOptions,
  FoodOptionDetails,
} from "../types/meal.type";
import config from "../config.json";

export const getMealOptions = (): Promise<MealOptions> => {
  return axios.get(`${config.apiUrl}/meal-options`).then((res) => res.data);
};

// export const addMealOptions = async (type: String) => {
//   return axios.post(`${config.apiUrl}/meal-options`, type);
// };

export const getFoodOptions = (
  searchTerm: string
): Promise<FoodOptionDetails> => {
  return axios
    .get(`${config.apiUrl}/food?query=${searchTerm}`)
    .then((res) => res.data);
};

export const getFoodCalories = (foodName: string): Promise<number> => {
  return axios
    .get(`${config.apiUrl}/food-calories?query=${foodName}`)
    .then((res) => res.data);
};

export const addMeal = async (meal: MealFood): Promise<void> => {
  return axios.post(`${config.apiUrl}/meal`, meal);
};

export const getMeal = (mealType: string, date: string): Promise<MealFoods> => {
  return axios
    .get(`${config.apiUrl}/meal?mealType=${mealType}&date=${date}`)
    .then((res) => res.data);
};
