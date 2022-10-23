import React from "react";
import { InformationCard } from "../../../shared-components/InformationCard";
import { useAppSelector } from "../../../hooks/typed-redux";
import DisplayMeal from "./DisplayMeal";
import { Divider, List, Card } from "@mui/material";

export const Meals = () => {
  const { todayMeals, isLoading, hasError } = useAppSelector(
    (state) => state.todayMeals
  );
  const { mealOptions } = useAppSelector((state) => state.meal);

  return (
    <>
      <h4>You have almost reached your daily goal</h4>
      {!isLoading && !hasError && todayMeals?.length > 0 ? (
        <Card
          sx={{
            display: "block",
            margin: "20px auto",
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          <List>
            {mealOptions?.map((mealOption, index) => (
              <div key={mealOption._doc.type}>
                {index > 0 && <Divider />}
                <>
                  {todayMeals?.filter((meal) => {
                    return meal.mealType === mealOption._doc.type;
                  }).length > 0 ? (
                    <>
                      <h3>{mealOption._doc.displayName}</h3>
                      <DisplayMeal
                        meals={todayMeals?.filter((meal) => {
                          return meal.mealType == mealOption._doc.type;
                        })}
                      />
                    </>
                  ) : null}
                </>
              </div>
            ))}
          </List>
        </Card>
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
