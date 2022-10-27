import axios from "axios";
import config from "../config.json";
import { WorkoutEntry, WorkoutsEntry } from "../types/workout.type";

export const getWorkout = async (): Promise<WorkoutsEntry> => {
  return axios.get(`${config.apiUrl}/user/workout`).then((res) => res.data);
};

export const addWorkout = async (workout: WorkoutEntry): Promise<void> => {
  return axios.post(`${config.apiUrl}/user/workout`, workout);
};
