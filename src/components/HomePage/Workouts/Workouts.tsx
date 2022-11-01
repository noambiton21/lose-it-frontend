import React from "react";
import { InformationCard } from "../../../shared-components/InformationCard";
import { useAppSelector } from "../../../hooks/typed-redux";
import DisplayWorkouts from "./DisplayWorkouts";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

export const Workouts = () => {
  const { workout, isLoading, hasError } = useAppSelector(
    (state) => state.workout
  );

  const theme = useTheme();

  return (
    <>
      {!isLoading && !hasError && workout?.length > 0 ? (
        <Box
          sx={{
            display: "block",
            margin: "20px auto",
            width: "30%",
            justifyContent: "space-between",
            "@media": {
              [theme.breakpoints.down("lg")]: {
                width: "80%",
              },
            },
          }}
        >
          <h3>Your daily activity </h3>
          {workout?.map((work, index) => (
            <div key={index}>
              <DisplayWorkouts workout={work} />
            </div>
          ))}
        </Box>
      ) : (
        <InformationCard
          title="Enjoy workouts"
          subtitle="Workouts are not mandatory but they sure can help!"
          imageUrl="/workouts.avif"
        />
      )}
    </>
  );
};
