import { Box, Button } from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import { FoodTable } from "./FoodTable/FoodTable";
import { MealFoods } from "../../../../types/meal.type";
import { v4 as uuidv4 } from "uuid";
import { addMeal, getMeal } from "../../../../services/meal.service";
import { sagaActions } from "../../../../sagas/sagaActions";
import { useAppDispatch } from "../../../../hooks/typed-redux";

export type MealProps = {
  mealType: string;
  onDone: () => void;
  date: string;
};

export const Meal = ({ mealType, onDone, date }: MealProps) => {
  const [tempFoods, setTempFoods] = useState<MealFoods>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getMeal(mealType, date).then((foods: MealFoods) => {
      setTempFoods(foods);
      console.log(foods);
    });
  }, []);

  const handleDeleteRow = useCallback(
    (index: number) => {
      const tempFoodsCopy = [...tempFoods];
      tempFoodsCopy.splice(index, 1);

      setTempFoods(tempFoodsCopy);
    },
    [tempFoods, setTempFoods]
  );

  const toggleEditMode = useCallback(
    (index: number) => {
      const tempFoodsCopy = [...tempFoods];
      tempFoodsCopy[index].edit = true;

      setTempFoods(tempFoodsCopy);
    },
    [tempFoods, setTempFoods]
  );

  const handleSaveRow = useCallback(
    (index: number, name: string, serving: number, calories: number) => {
      const tempFoodsCopy = [...tempFoods];
      tempFoodsCopy[index].foodName = name;
      tempFoodsCopy[index].servingSize = serving;
      tempFoodsCopy[index].edit = false;
      tempFoodsCopy[index].mealType = mealType;

      setTempFoods(tempFoodsCopy);

      const newFood = {
        foodName: name,
        servingSize: serving,
        calories: calories,
        edit: false,
        mealType: mealType,
        id: uuidv4(),
      };

      addMeal(newFood).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    [tempFoods, setTempFoods]
  );

  const handleDone = () => {
    dispatch({
      type: sagaActions.FETCH_MEAL_OPTIONS,
      payload: date,
    });

    dispatch({ type: sagaActions.FETCH_TOTAL_DAY_CALORIES });
    onDone();
  };

  return (
    <>
      <Box marginBottom="20px">
        <FoodTable
          foods={tempFoods}
          onRowDelete={handleDeleteRow}
          onRowEdit={toggleEditMode}
          onRowSave={handleSaveRow}
        />
      </Box>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => {
          setTempFoods([
            ...tempFoods,
            {
              foodName: "",
              servingSize: 1,
              calories: 0,
              edit: true,
              id: uuidv4(),
              mealType: mealType,
            },
          ]);
        }}
      >
        Add Item
      </Button>
      <Box height="10px" />
      <Button variant="contained" fullWidth onClick={handleDone}>
        Im Done
      </Button>
    </>
  );
};
