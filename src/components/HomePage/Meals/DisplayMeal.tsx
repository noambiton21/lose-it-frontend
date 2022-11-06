import React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { MealFoods, MealFood } from "../../../types/meal.type";

export type DisplayMealProps = {
  meals?: MealFoods;
};

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

const DisplayMeal = ({ meals }: DisplayMealProps) => {
  return (
    <Card sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          bgcolor: "background.paper",
          maxWidth: "100%",
          textAlign: "left",
        }}
      >
        {meals.map((meal: MealFood, index) => (
          <Item key={index}>
            <Avatar alt={meal.foodName} src={meal.imageUrl} />
            <Typography variant="body1" color="text.primary">
              {`${meal.servingSize} ${meal.foodName}`}
            </Typography>
            <Typography variant="subtitle2" color="text.primary">
              {` ${meal.calories} calories`}
            </Typography>
            <Typography variant="subtitle2" color="text.primary">
              {` ${meal.nf_protein} protein(g)`}
            </Typography>
            <Typography variant="subtitle2" color="text.primary">
              {` ${meal.nf_total_fat} fat(g)`}
            </Typography>
          </Item>
        ))}
      </Box>
    </Card>
  );
};

export default DisplayMeal;
