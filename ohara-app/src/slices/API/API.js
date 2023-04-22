import axios from "axios";

export let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDkvMDkvaWRlbnRpdHkvY2xhaW1zL2FjdG9yIjoiODI1MGJjYjgtNzczMy00YWEwLTk5ZWMtMmFhZjEwNjUxNWZhIiwiZXhwIjoxNjgyMTkyMDE1LCJpc3MiOiJDaGllZiIsImF1ZCI6IkF1dGhDbGllbnQifQ.UGTatp-Vo7e3OtjSfH5_H_BLF-mjxpmt2TMXp0H-jDw";

export const setToken = (data) => {
  token = data;
  console.log(token);
};

export const instance = axios.create({
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  baseURL: "http://185.221.196.50:7952/api/v1/",
});
