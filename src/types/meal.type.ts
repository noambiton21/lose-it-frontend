export type MealOptions = MealOption[];

export type MealOption = {
  type: string;
  displayName: string;
};

export type MealsCalories = MealCalories[];

export type MealCalories = {
  _doc: {
    displayName: string;
    type: string;
  };
  totalCalories: number;
};

export type MealFoods = MealFood[];
export type MealFood = {
  foodName: string;
  servingSize: number;
  calories: number;
  imageUrl: string;
  edit: boolean;
  id: string;
  mealType: string;
  serving_unit: string;
  nf_total_fat: number;
  nf_protein: number;
  nf_sugars: number;
};

export type FoodOptionDetails = FoodOptionDetail[];
export type FoodOptionDetail = {
  food_name: string;
  photo: {
    thumb: string;
  };
};

export type FoodOptions = FoodOption[];

export type FoodOption = {
  food_name: string;
  photo: {
    thumb: string;
  };
};

export type FoodDetails = {
  nf_calories: number;
  serving_unit: string;
  nf_total_fat: number;
  nf_protein: number;
  nf_sugars: number;
};
