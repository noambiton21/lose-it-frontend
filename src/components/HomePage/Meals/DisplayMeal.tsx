import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { MealFoods, MealFood } from "../../../types/meal.type";

export type DisplayMealProps = {
  meals?: MealFoods;
};

const DisplayMeal = ({ meals }: DisplayMealProps) => {
  return (
    <Card sx={{ mb: 3 }}>
      <List sx={{ width: "100%" }}>
        <ListItem sx={{ alignItems: "flex-start" }}>
          {meals.map((meal: MealFood, index) => (
            <Box sx={{ mr: 3 }} key={index}>
              <ListItemAvatar>
                <Avatar alt={meal.foodName} src={meal.imageUrl} />
              </ListItemAvatar>
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography sx={{}} variant="body2" color="text.primary">
                      {`${meal.servingSize} ${meal.foodName}`}
                    </Typography>
                    {` ${meal.calories} calories`}
                  </React.Fragment>
                }
              />
            </Box>
          ))}
        </ListItem>
      </List>
    </Card>
  );
};

export default DisplayMeal;
