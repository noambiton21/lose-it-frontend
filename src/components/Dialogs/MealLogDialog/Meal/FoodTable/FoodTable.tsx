import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { MealFoods, FoodDetails } from "../../../../../types/meal.type";
import { FoodRow } from "../FoodRow/FoodRow";

export type FoodTableProps = {
  foods: MealFoods;
  onRowDelete: (index: number) => void;
  onRowEdit: (index: number) => void;
  onRowSave: (
    index: number,
    name: string,
    serving: number,
    calories: number,
    imageUrl: string,
    serving_unit: string,
    nf_total_fat: number,
    nf_protein: number,
    nf_sugars: number
  ) => void;
};

export const FoodTable = ({
  foods,
  onRowEdit,
  onRowSave,
  onRowDelete,
}: FoodTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Food Name</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Serving
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Calories
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foods.length > 0 &&
            foods.map((food, index) => (
              <FoodRow
                key={food.id}
                food={food}
                onDelete={() => onRowDelete(index)}
                onSave={(
                  name: string,
                  serving: number,
                  calories: number,
                  imageUrl: string,
                  serving_unit: string,
                  nf_total_fat: number,
                  nf_protein: number,
                  nf_sugars: number
                ) =>
                  onRowSave(
                    index,
                    name,
                    serving,
                    calories,
                    imageUrl,
                    serving_unit,
                    nf_total_fat,
                    nf_protein,
                    nf_sugars
                  )
                }
                onEdit={() => onRowEdit(index)}
              />
            ))}
          {foods.length === 0 && (
            <TableRow>
              <TableCell colSpan={3}>
                Start adding items to track your calorie consumption!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
