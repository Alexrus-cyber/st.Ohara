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
  paymentID: "",
  status: "",
  statusPay: "",
  bookingOpen: false,
};
export const getTablesLaunge = createAsyncThunk(
  "getTablesLaunge",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`booking/table/launge`)
        .then((response) => response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const getTablesHall = createAsyncThunk(
  "getTablesHall",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`booking/table/hall`)
        .then((response) => response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const checkStatus = createAsyncThunk(
  "checkStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`check`)
        .then((response) => response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
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
export const stopBooking = createAsyncThunk(
  "stopBooking",
  async (book, { rejectWithValue }) => {
    try {
      await instance
        .put(
          `check/true`,
          {},
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => response.data);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const wakeBooking = createAsyncThunk(
  "wakeBooking",
  async (book, { rejectWithValue, dispatch }) => {
    try {
      await instance
        .put(
          `check/false`,
          {},
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => response.data);
      dispatch(clearData());
      dispatch(getTablesLaunge());
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const getStatusBooking = createAsyncThunk(
  "getStatusBooking",
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`booking/${id}`)
        .then((response) => response.data);
      return response.status;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearData: (state) => {
      state.error = "";
    },
    bookingStart: (state) => {
      state.bookingOpen = true;
    },
  },
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
        console.log(state.launge);
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getTablesLaunge.rejected, (state, { payload }) => {
        state.loading = false;
        if (Math.floor(payload.response.status / 100) === 4) {
          state.error = payload.response.statusText;
          if (state.error === "Not Found") {
            state.error = "Нет доступа к контенту, \n перезагрузите страницу";
          }
        } else {
          state.error = "Ошибка сервера";
        }
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
        console.log(state.hall);
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getTablesHall.rejected, (state, { payload }) => {
        state.loading = false;
        if (Math.floor(payload.response.status / 100) === 4) {
          state.error = payload.response.statusText;
          if (state.error === "Not Found") {
            state.error = "Нет доступа к контенту, \n перезагрузите страницу";
          }
        } else {
          state.error = "Ошибка сервера";
        }
      })
      .addCase(getStatusBooking.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(getStatusBooking.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.statusPay = payload;
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getStatusBooking.rejected, (state, { payload }) => {
        state.loading = false;
        if (Math.floor(payload.response.status / 100) === 4) {
          state.error = payload.response.statusText;
        } else {
          state.error = "Ошибка сервера";
        }
      })
      .addCase(checkStatus.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(checkStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.status = payload;
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(checkStatus.rejected, (state, { payload }) => {
        state.loading = false;
        if (Math.floor(payload.response.status / 100) === 4) {
          state.error = payload.response.statusText;
        } else {
          state.error = "Ошибка сервера";
        }
      })
      .addCase(createBooking.rejected, (state, { payload }) => {
        if (Math.floor(payload.response.status / 100) === 4) {
          state.error = payload.response.statusText;
        } else {
          state.error = payload.response.data.data;
        }
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
export const { clearData, bookingStart } = bookingSlice.actions;
export default bookingSlice.reducer;
