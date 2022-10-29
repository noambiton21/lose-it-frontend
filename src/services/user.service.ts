import axios from "axios";
import config from "../config.json";
import { User } from "../types/user.type";

export const login = async (email: string, password: string) => {
  return axios
    .post(`${config.apiUrl}/login`, {
      email,
      password,
    })
    .then((res) => res.data);
};

export const register = async (email: string, password: string) => {
  return axios
    .post(`${config.apiUrl}/register`, {
      email,
      password,
    })
    .then((res) => res.data);
};

export const onboard = async (userData: Omit<User, "email">) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  return axios.put(`${config.apiUrl}/user`, userData, {
    headers: {
      Authorization: "Bearer " + storedData.token,
    },
  });
};

export const getUser = async (token: string): Promise<User> => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  return axios
    .get(`${config.apiUrl}/user`, {
      headers: {
        Authorization: "Bearer " + storedData.token,
      },
    })
    .then((res) => res.data);
};
