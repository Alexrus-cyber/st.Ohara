import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { instance } from "../API/API";

const initialState = {
  bar: [],
  launge: [],
  street: [],
  hall: [],
  loading: true,
  error: "",
};
export const getTablesLaunge = createAsyncThunk(
  "getTablesLaunge",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`table/launge`)
        .then((response) => response.data);
      console.log(response.data);
      return response.data;
    } catch (e) {
      return prompt(rejectWithValue(e));
    }
  }
);
export const getTablesBar = createAsyncThunk(
  "getTablesBar",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`table/bar`)
        .then((response) => response.data);
      console.log(response.data);
      return response.data;
    } catch (e) {
      return prompt(rejectWithValue(e));
    }
  }
);
export const getTablesStreet = createAsyncThunk(
  "getTablesStreet",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`table/street`)
        .then((response) => response.data);
      console.log(response.data);
      return response.data;
    } catch (e) {
      return prompt(rejectWithValue(e));
    }
  }
);
export const getTablesHall = createAsyncThunk(
  "getTablesHall",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`table/hall`)
        .then((response) => response.data);
      console.log(response.data);
      return response.data;
    } catch (e) {
      return prompt(rejectWithValue(e));
    }
  }
);

export const getSchemeBar = createAsyncThunk(
  "getSchemeBar",
  async (data, { rejectWithValue }) => {
    try {
      await instance.get(`bookingTable`).then((response) => response.data);
    } catch (e) {
      return prompt(rejectWithValue(e));
    }
  }
);

export const createBooking = createAsyncThunk(
  "createBooking",
  async (book, { rejectWithValue }) => {
    try {
      const { id, data, callback } = book;
      const table = {
        ...data,
        tableIds: [id],
        durationInMinutes: 120,
      };
      console.log(table);
      const response = await instance
        .post(`booking`, table, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => response.data);
      callback(response.data);
    } catch (e) {
      return rejectWithValue(e);
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
        state.bar = payload.sort(function (a, b) {
          return a.number - b.number;
        });
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getTablesBar.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTablesStreet.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(getTablesStreet.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.street = payload.sort(function (a, b) {
          return a.number - b.number;
        });
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getTablesStreet.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTablesHall.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(getTablesHall.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.hall = payload.sort(function (a, b) {
          return a.number - b.number;
        });
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getTablesHall.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createBooking.rejected, (state, payload) => {
        console.log(payload);
        state.error = "";
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
export const getStreetSelector = createSelector(
  stateSelector,
  (state) => state.street
);
export const getHallSelector = createSelector(
  stateSelector,
  (state) => state.hall
);

export default bookingSlice.reducer;
