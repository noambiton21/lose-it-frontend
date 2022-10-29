import axios from "axios";
import config from "../config.json";
import { WeightHistory, WeightHistoryEntry } from "../types/weightHistory.type";

// export const getWeightHistory = async (): Promise<WeightHistory> => {
//   const storedData = JSON.parse(localStorage.getItem("userData"));
//   return axios
//     .get(`${config.apiUrl}/user/weight-history`, {
//       headers: {
//         Authorization: "Bearer " + storedData.token,
//       },
//     })
//     .then((res) => res.data);
// };

export const getWeightHistory = async (): Promise<WeightHistory> => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  return axios
    .get(`${config.apiUrl}/user/weight-history`, {
      headers: {
        Authorization: "Bearer " + storedData.token,
      },
    })
    .then((response) => {
      if (!response) {
        console.log("***" + response.data);
      }
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
  const storedData = JSON.parse(localStorage.getItem("userData"));
  return axios.post(
    `${config.apiUrl}/user/weight-history`,
    weightHistoryEntry,
    {
      headers: {
        Authorization: "Bearer " + storedData.token,
      },
    }
  );
};
