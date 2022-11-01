import {
  Box,
  LinearProgress,
  linearProgressClasses,
  styled,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useUser } from "../../../hooks/useCheckUser";
import { useAppSelector } from "../../../hooks/typed-redux";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 5,
  width: "60%",
  margin: "0 auto",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export const CalorieGoal = () => {
  const { user } = useUser();
  const { workout } = useAppSelector((state) => state.workout);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const [linearProgress, setLinearProgress] = useState("0");
  const { totalDayCalories, isLoading, hasError } = useAppSelector(
    (state) => state.dayCalories
  );

  useEffect(() => {
    let sumBurnedCalories = 0;
    if (workout) {
      sumBurnedCalories = workout.reduce((accumulator, w) => {
        return accumulator + w.caloriesBurned;
      }, 0);
      setCaloriesBurned(sumBurnedCalories);
    }
    const updatedLinearProgress = (
      (Number(totalDayCalories) / (user.calorieGoal + sumBurnedCalories)) *
      100
    ).toFixed();
    if (Number(updatedLinearProgress) > 100) {
      setLinearProgress("100");
    } else {
      setLinearProgress(updatedLinearProgress);
    }
  }, [totalDayCalories, workout]);

  return (
    <Box margin="30px 0">
      <Typography variant="h5" gutterBottom>
        {!isLoading && !hasError && totalDayCalories ? (
          <>
            Calories goal: {Math.trunc(Number(totalDayCalories))} /
            {user.calorieGoal + caloriesBurned}
          </>
        ) : (
          <>
            Calories goal: {0} /{user.calorieGoal + caloriesBurned}
          </>
        )}
      </Typography>
      <BorderLinearProgress
        variant="determinate"
        value={Number(linearProgress)}
      />
      <Typography variant="caption" margin="30px 0">
        {!isLoading && !hasError && totalDayCalories ? (
          <>
            Remaining:{" "}
            {Math.trunc(
              user.calorieGoal + caloriesBurned - Number(totalDayCalories)
            )}
          </>
        ) : null}
      </Typography>
    </Box>
  );
};
