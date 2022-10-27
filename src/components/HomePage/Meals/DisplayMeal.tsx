import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { MealFoods, MealFood } from "../../../types/meal.type";

export type DisplayMealProps = {
  meals?: MealFoods;
};

const DisplayMeal = ({ meals }: DisplayMealProps) => {
  return (
    <div>
      <List sx={{ width: "100%" }}>
        <ListItem alignItems="flex-start">
          {meals.map((meal: MealFood, index) => (
            <div key={index}>
              <ListItemAvatar>
                <Avatar alt={meal.foodName} src={meal.imageUrl} />
              </ListItemAvatar>
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`${meal.servingSize} ${meal.foodName}`}
                    </Typography>
                    {` ${meal.calories} calories`}
                  </React.Fragment>
                }
              />
            </div>
          ))}
        </ListItem>
      </List>
    </div>
  );
};

export default DisplayMeal;
