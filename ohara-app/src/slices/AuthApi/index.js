import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance, setToken } from "../API/API";

const initialState = {
  email: null,
  password: null,
  token: null,
};

export const loginMe = createAsyncThunk(
  "authLogin",
  async ({ email, password }, { rejectedWithValue }) => {
    try {
      const response = await instance
        .post(`auth/login`, { email, password })
        .then((response) => response.data);
      return response.data;
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);
export const getMe = createAsyncThunk(
  "getMe",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await instance
        .get(`users/me`)
        .then((response) => response.data);
      return response.data;
    } catch (e) {
      if (e.response.status === 401) {
        console.log("Пользователь не авторизован");
      }
      return rejectedWithValue(e);
    }
  }
);

export const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginMe.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload;
        setToken(payload);
        console.log(payload);
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(loginMe.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(getMe.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getMe.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
