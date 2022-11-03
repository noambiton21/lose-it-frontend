import React from "react";
import { InformationCard } from "../../../shared-components/InformationCard";
import { useAppSelector } from "../../../hooks/typed-redux";
import DisplayMeal from "./DisplayMeal";
import { Divider, List, Card, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const Meals = () => {
  const { todayMeals, isLoading, hasError } = useAppSelector(
    (state) => state.todayMeals
  );
  const { mealOptions } = useAppSelector((state) => state.meal);

  const theme = useTheme();

  return (
    <>
      {!isLoading && !hasError && todayMeals?.length > 0 ? (
        <Box
          sx={{
            display: "block",
            margin: "20px auto",
            width: "30%",
            "@media": {
              [theme.breakpoints.down("lg")]: {
                width: "100%",
              },
            },
          }}
        >
          <h3>Your daily meals</h3>

          <List>
            {mealOptions?.map((mealOption, index) => (
              <div key={mealOption._doc.type}>
                {todayMeals?.filter((meal) => {
                  return meal.mealType === mealOption._doc.type;
                }).length > 0 ? (
                  <>
                    <Typography variant="h6" color="text.primary">
                      {mealOption._doc.displayName}
                    </Typography>
                    <DisplayMeal
                      meals={todayMeals?.filter((meal) => {
                        return meal.mealType == mealOption._doc.type;
                      })}
                    />
                  </>
                ) : null}
              </div>
            ))}
          </List>
        </Box>
      ) : (
        <InformationCard
          title="Log your meals"
          subtitle="You haven't logged any meals today"
          imageUrl="/meals.avif"
        />
      )}
    </>
  );
};

{
  /* <Divider variant="inset" component="li" /> */
}
