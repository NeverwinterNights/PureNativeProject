import axios from "axios";
import { DEV_BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";


export type LoginType = {
  email: string,
  password: string,
  username: string,
  first_name: string,
  last_name: string,
}

export type LoginData = {
  username: string
  password: string
}


export type CreateContact = {
  country_code: string
  first_name: string
  last_name: string
  phone_number: string
  contact_picture: string
  is_favorite: boolean
}


let headers = {};


export const navigationRef = React.createRef<any>()

export const navTo = (name: string, params: any) => {
  if (navigationRef.current) {
    navigationRef.current.navTo(name, params)
  }
}


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


// instance.interceptors.response.use(
//   response=> new Promise((res, rej)=> {
//     res(response)
//   }),
//   error => {
//     if (!error.response) {
//       return new Promise((res, rej)=> {
//         rej(error)
//       })
//     }
//     if (error.response.status===403) {
//
//     } else {
//       return new Promise((res, rej)=> {
//         rej(error)
//       })
//     }
//   }
// );




export const apiRequests = {
  register({ email, password, username, first_name, last_name }: LoginType) {
    return instance.post("/auth/register", {
      email, password, username, first_name, last_name,
    });
  },
  login({ username, password }: LoginData) {
    return instance.post("/auth/login", { username, password });
  },
  getContacts() {
    return instance.get("/contacts");
  },
  createContacts({ country_code, first_name, last_name, phone_number, contact_picture, is_favorite }: CreateContact) {
    return instance.post("/contacts/", {country_code, first_name, last_name, phone_number, contact_picture, is_favorite});
  },
};
