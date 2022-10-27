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
