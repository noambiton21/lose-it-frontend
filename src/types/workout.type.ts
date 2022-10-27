export type WorkoutEntry = {
  date: Date;
  caloriesBurned: number;
  activity: string;
  workoutTime: number;
  heartRate: number;
};

export type WorkoutsEntry = WorkoutEntry[];
