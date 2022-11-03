import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { WorkoutEntry } from "../../../types/workout.type";

const activityImages = {
  Walking: "/walking.jpg",
  Running: "/running.jpg",
  Cycling: "/cycling.jpg",
  Gym: "/workouts.avif",
};

export type DisplayWorkoutProps = {
  workout?: WorkoutEntry;
};

const DisplayWorkouts = ({ workout }: DisplayWorkoutProps) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={activityImages[workout.activity]}
          alt={workout.activity}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {workout.activity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`You ${workout.activity} for ${
              workout.workoutTime
            } minutes, reached a pace of ${
              workout.heartRate
            } heartbeats and thus burned ${Math.abs(
              workout.caloriesBurned
            )} calories`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DisplayWorkouts;
