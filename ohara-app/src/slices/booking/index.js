import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { instance } from "../API/API";

const initialState = {
  bar: [],
  launge: [],
  loading: true,
  error: "",
};
export const getTablesLaunge = createAsyncThunk(
  "getTablesLaunge",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await instance
        .get(`table/launge`)
        .then((response) => response.data);
      console.log(response.data);
      return response.data;
    } catch (e) {
      return prompt(rejectedWithValue(e));
    }
  }
);
export const getTablesBar = createAsyncThunk(
  "getTablesBar",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await instance
        .get(`table/bar`)
        .then((response) => response.data);
      console.log(response.data);
      return response.data;
    } catch (e) {
      return prompt(rejectedWithValue(e));
    }
  }
);

export const getSchemeBar = createAsyncThunk(
  "getSchemeBar",
  async (data, { rejectedWithValue }) => {
    try {
      await instance.get(`bookingTable`).then((response) => response.data);
    } catch (e) {
      return prompt(rejectedWithValue(e));
    }
  }
);

export const createBooking = createAsyncThunk(
  "createBooking",
  async (book, { rejectedWithValue }) => {
    try {
      const { data, callback } = book;
      console.log(data);
      const response = await instance
        .post(`booking`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => response.data);
      callback(response.data);
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //здесь имитируем закгрузку
      .addCase(getTablesLaunge.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(getTablesLaunge.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.launge = payload;
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getTablesLaunge.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTablesBar.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(getTablesBar.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.bar = payload;
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getTablesBar.rejected, (state) => {
        state.loading = false;
      });
  },
});
const stateSelector = (state) => state?.booking;

export const getLaungeSelector = createSelector(
  stateSelector,
  (state) => state.launge
);
export const getBarSelector = createSelector(
  stateSelector,
  (state) => state.bar
);

export default bookingSlice.reducer;
