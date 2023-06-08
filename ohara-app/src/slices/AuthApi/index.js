import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance, setAccessToken } from "../API/API";
import { stopSubmit } from "redux-form";

const initialState = {
  email: null,
  password: null,
  token1: null,
  user: {},
};

export const loginMe = createAsyncThunk(
  "authLogin",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const response = await instance
        .post(`auth/login`, { email, password })
        .then((response) => response.data);
      sessionStorage.setItem("token", response.data);
      setAccessToken(response.data);
      return response.data;
    } catch (e) {
      if (e.response.status > 400) {
        dispatch(
          stopSubmit("login", {
            _error: "Неправильный логин или пароль",
          })
        );
      }
      return rejectWithValue(e);
    }
  }
);

export const getMe = createAsyncThunk(
  "getMe",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`users/me`)
        .then((response) => response.data);
      return response.data;
    } catch (e) {
      if (e.response.status === 401) {
        console.log("Пользователь не авторизован");
      }
      return rejectWithValue(e);
    }
  }
);

export const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserNull(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginMe.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token1 = payload;
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
        state.user = payload;
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getMe.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { setUserNull } = authSlice.actions;
export default authSlice.reducer;
