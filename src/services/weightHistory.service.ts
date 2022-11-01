import axios from "axios";
import config from "../config.json";
import { WeightHistory, WeightHistoryEntry } from "../types/weightHistory.type";
import { defaultHeaders } from "../utils/auth";

export const getUserWeight = async (): Promise<number> => {
  return axios
    .get(`${config.apiUrl}/user/weight`, {
      headers: defaultHeaders(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
};

export const getWeightHistory = async (): Promise<WeightHistory> => {
  return axios
    .get(`${config.apiUrl}/user/weight-history`, {
      headers: defaultHeaders(),
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
};

export const addWeight = async (
  weightHistoryEntry: WeightHistoryEntry
): Promise<void> => {
  return axios.post(
    `${config.apiUrl}/user/weight-history`,
    weightHistoryEntry,
    {
      headers: defaultHeaders(),
    }
  );
};
