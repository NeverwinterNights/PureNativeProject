import axios from "axios";
import { DEV_BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";


export type LoginType = {
  email: string,
  password: string,
  username: string,
  first_name: string,
  last_name: string,
}


let headers = {};

export const instance = axios.create({
  baseURL: DEV_BACKEND_URL,
  headers,
});


instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const apiRequests = {
  login({ email, password, username, first_name, last_name }: LoginType) {
    return instance.post("/auth/register", {
      email, password, username, first_name, last_name,
    });
  },
};
