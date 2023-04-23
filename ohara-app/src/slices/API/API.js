import axios from "axios";

const token = "";
export const instance = axios.create({
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  baseURL: "http://185.221.196.50:7952/api/v1/",
});
