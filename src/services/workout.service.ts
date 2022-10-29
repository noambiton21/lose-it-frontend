import axios from "axios";
import config from "../config.json";
import { WorkoutEntry, WorkoutsEntry } from "../types/workout.type";

export const getWorkout = async (): Promise<WorkoutsEntry> => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  return axios
    .get(`${config.apiUrl}/user/workout`, {
      headers: {
        Authorization: "Bearer " + storedData.token,
      },
    })
    .then((res) => res.data);
};

export const addWorkout = async (workout: WorkoutEntry): Promise<void> => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  return axios.post(`${config.apiUrl}/user/workout`, workout, {
    headers: {
      Authorization: "Bearer " + storedData.token,
    },
  });
};
