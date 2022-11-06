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
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          "@media": {
            [theme.breakpoints.down("sm")]: {
              display: "block",
              width: "100%",
            },
          },
        }}
      >
        <TableHead
          sx={{
            "@media": {
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            },
          }}
        >
          <TableRow
            sx={{
              "@media": {
                [theme.breakpoints.down("sm")]: {
                  mb: 15,
                  display: "block",
                  width: "100%",
                },
              },
            }}
          >
            <TableCell
              sx={{
                fontWeight: "bold",
                "@media": {
                  [theme.breakpoints.down("sm")]: {
                    display: "block",
                    width: "100%",
                    pl: 30,
                    right: 0,
                    textAlign: "left",
                    position: "relative",
                  },
                },
              }}
            >
              Food Name
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontWeight: "bold",
                "@media": {
                  [theme.breakpoints.down("sm")]: {
                    display: "block",
                    width: "100%",
                    pl: 30,
                    right: 0,
                    textAlign: "left",
                    position: "relative",
                  },
                },
              }}
            >
              Serving
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontWeight: "bold",
                "@media": {
                  [theme.breakpoints.down("sm")]: {
                    display: "block",
                    width: "100%",
                    pl: 30,
                    right: 0,
                    textAlign: "left",
                    position: "relative",
                  },
                },
              }}
            >
              Calories
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "@media": {
              [theme.breakpoints.down("sm")]: {
                display: "block",
                width: "100%",
              },
            },
          }}
        >
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
