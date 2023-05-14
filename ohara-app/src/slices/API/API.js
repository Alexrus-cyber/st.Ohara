import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "http://185.221.196.50:7952/api/v1/",
});

export const setAccessToken = (token) => {
  token && (instance.defaults.headers.common.Authorization = `Bearer ${token}`);
  !token && delete instance.defaults.headers.common.Authorization;
};
