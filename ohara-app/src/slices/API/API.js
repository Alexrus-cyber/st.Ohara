import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://api.stohara.pub/api/v1/",
});

export const secondInst = axios.create({
  withCredentials: true,
  baseURL: "http://45.87.104.46:7952/api/v1/",
});

export const setAccessToken = (token) => {
  token && (instance.defaults.headers.common.Authorization = `Bearer ${token}`);
  !token && delete instance.defaults.headers.common.Authorization;
};
