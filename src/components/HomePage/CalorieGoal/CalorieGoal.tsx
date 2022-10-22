import {
  Box,
  LinearProgress,
  linearProgressClasses,
  styled,
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

  const [linearProgress, setLinearProgress] = useState("0");
  const { totalDayCalories, isLoading, hasError } = useAppSelector(
    (state) => state.dayCalories
  );

  useEffect(() => {
    setLinearProgress(
      ((Number(totalDayCalories) / user.calorieGoal) * 100).toFixed()
    );
  }, totalDayCalories);

  return (
    <Box margin="30px 0">
      <Typography variant="h5" gutterBottom>
        {!isLoading && !hasError && totalDayCalories ? (
          <>
            Calories goal: {totalDayCalories} /{user.calorieGoal}
          </>
        ) : (
          <>
            Calories goal: {0} /{user.calorieGoal}
          </>
        )}
      </Typography>
      <BorderLinearProgress
        variant="determinate"
        value={Number(linearProgress)}
      />
    </Box>
  );
};
