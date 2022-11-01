import axios from "axios";
import config from "../config.json";
import { WorkoutEntry, WorkoutsEntry } from "../types/workout.type";
import { defaultHeaders } from "../utils/auth";

export const getWorkout = async (): Promise<WorkoutsEntry> => {
  return axios
    .get(`${config.apiUrl}/user/workout`, {
      headers: defaultHeaders(),
    })
    .then((res) => res.data);
};

export const addWorkout = async (workout: WorkoutEntry): Promise<void> => {
  return axios.post(`${config.apiUrl}/user/workout`, workout, {
    headers: defaultHeaders(),
  });
};
