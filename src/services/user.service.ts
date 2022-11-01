import axios from "axios";
import config from "../config.json";
import { User } from "../types/user.type";
import { defaultHeaders } from "../utils/auth";

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
  return axios.put(`${config.apiUrl}/user`, userData, {
    headers: defaultHeaders(),
  });
};

export const getUser = async (): Promise<User> => {
  return axios
    .get(`${config.apiUrl}/user`, {
      headers: defaultHeaders(),
    })
    .then((res) => res.data);
};
