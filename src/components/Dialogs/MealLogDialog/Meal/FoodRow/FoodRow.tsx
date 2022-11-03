import {
  IconButton,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { MealFood, FoodDetails } from "../../../../../types/meal.type";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { FoodRowAutocomplete } from "../FoodRowAutocomplete/FoodRowAutocomplete";
import { getFoodCalories } from "../../../../../services/meal.service";

export type FoodRowProps = {
  food: MealFood;
  onDelete: () => void;
  onSave: (
    name: string,
    serving: number,
    calories: number,
    imageUrl: string,
    serving_unit: string,
    nf_total_fat: number,
    nf_protein: number,
    nf_sugars: number
  ) => void;
  onEdit: () => void;
};

export type FoodAutocompleteOption = {
  label: string;
  imageUrl: string;
};

export const FoodRow = ({ food, onDelete, onSave, onEdit }: FoodRowProps) => {
  const [selectedFood, setSelectedFood] = useState<FoodAutocompleteOption>({
    label: food.foodName,
    imageUrl: "",
  });
  const [tempServing, setTempServing] = useState(food.servingSize);
  const [tempCalories, setTempCalories] = useState(food.calories);
  const [fat, setFat] = useState(food.nf_total_fat);
  const [protein, setProtein] = useState(food.nf_protein);
  const [servingUnit, setServingUnit] = useState(food.serving_unit);
  const [sugar, setSugar] = useState(food.nf_sugars);

  useEffect(() => {
    if (selectedFood?.label !== "") {
      getFoodCalories(selectedFood?.label).then((foodDetails: FoodDetails) => {
        food.nf_protein = foodDetails.nf_protein;
        food.nf_sugars = foodDetails.nf_sugars;
        food.nf_total_fat = foodDetails.nf_total_fat;
        food.serving_unit = foodDetails.serving_unit;
        food.imageUrl = selectedFood.imageUrl;
        setFat(foodDetails.nf_total_fat);
        setProtein(foodDetails.nf_protein);
        setServingUnit(foodDetails.serving_unit);
        setSugar(foodDetails.nf_sugars);

        if (tempServing > 0) {
          setTempCalories(Math.trunc(foodDetails.nf_calories * tempServing));
          food.calories = Math.trunc(foodDetails.nf_calories * tempServing);
        } else {
          setTempCalories(Math.trunc(foodDetails.nf_calories));
          food.calories = Math.trunc(foodDetails.nf_calories);
        }
      });
    }
  }, [selectedFood?.label, tempServing]);
  console.log(tempCalories);
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <FoodRowAutocomplete
          food={food}
          selectedFood={selectedFood}
          onFoodSelect={setSelectedFood}
        />
        <Typography variant="caption">
          {servingUnit !== "" && typeof servingUnit !== "undefined"
            ? ` -  ${servingUnit}`
            : ""}
        </Typography>
      </TableCell>
      <TableCell align="center">
        {food.edit ? (
          <TextField
            variant="standard"
            size="small"
            label={"Serving"}
            value={tempServing}
            type="number"
            sx={{ width: "70px" }}
            onChange={(e) => setTempServing(Number(e.target.value))}
          />
        ) : (
          food.servingSize
        )}
      </TableCell>
      <TableCell align="center">
        {tempCalories === 0 || isNaN(tempCalories) ? "-" : tempCalories}
      </TableCell>
      <TableCell>
        {food.edit ? (
          <IconButton
            size="small"
            onClick={() =>
              onSave(
                selectedFood.label,
                tempServing,
                tempCalories,
                selectedFood.imageUrl,
                servingUnit,
                fat,
                sugar,
                protein
              )
            }
          >
            <SaveIcon fontSize="inherit" />
          </IconButton>
        ) : (
          <IconButton size="small" onClick={() => onEdit()}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        )}
        <IconButton size="small" onClick={() => onDelete()}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

function useCallBack(arg0: () => void, arg1: any[]) {
  throw new Error("Function not implemented.");
}
