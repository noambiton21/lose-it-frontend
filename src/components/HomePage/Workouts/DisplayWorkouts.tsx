import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { WorkoutEntry } from "../../../types/workout.type";

export type DisplayWorkoutProps = {
  workout?: WorkoutEntry;
};

const DisplayWorkouts = ({ workout }: DisplayWorkoutProps) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/workouts.avif"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {workout.activity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`You ${workout.activity} for ${workout.workoutTime} minutes, reached a pace of ${workout.heartRate} beats and thus burned ${workout.caloriesBurned} calories`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DisplayWorkouts;
