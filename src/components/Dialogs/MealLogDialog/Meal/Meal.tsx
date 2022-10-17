import { Box, Button } from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import { FoodTable } from "./FoodTable/FoodTable";
import { MealFoods } from "../../../../types/meal.type";
import { v4 as uuidv4 } from "uuid";
import { addMeal, getMeal } from "../../../../services/meal.service";

export type MealProps = {
  mealType: string;
  onDone: () => void;
  date:string;
};

export const Meal = ({ mealType, onDone ,date}: MealProps) => {
  const [tempFoods, setTempFoods] = useState<MealFoods>([]);

  useEffect(() => {
    // const date = new Date().toISOString().slice(0, 10);
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
    (index: number, name: string, serving: number) => {
      const tempFoodsCopy = [...tempFoods];
      tempFoodsCopy[index].foodName = name;
      tempFoodsCopy[index].servingSize = serving;
      tempFoodsCopy[index].edit = false;
      tempFoodsCopy[index].mealType = mealType;

      setTempFoods(tempFoodsCopy);

      console.log(tempFoods);
    },
    [tempFoods, setTempFoods]
  );

  const handleDone = (e) => {
    e.preventDefault();
    tempFoods.map((tempFood) =>
      addMeal(tempFood).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      )
    );
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
