import React from "react";
import { InformationCard } from "../../../shared-components/InformationCard";
import { useAppSelector } from "../../../hooks/typed-redux";
import DisplayWorkouts from "./DisplayWorkouts";
import Card from "@mui/material/Card";

export const Workouts = () => {
  const { workout, isLoading, hasError } = useAppSelector(
    (state) => state.workout
  );
  console.log(workout);

  return (
    <>
      {!isLoading && !hasError && workout?.length > 0 ? (
        <Card
          sx={{
            display: "block",
            margin: "20px auto",
            width: "80%",
            justifyContent: "space-between",
            backgroundColor: "#fafbfb",
          }}
        >
          {workout?.map((work, index) => (
            <div key={index}>
              <DisplayWorkouts workout={work} />
            </div>
          ))}
        </Card>
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
