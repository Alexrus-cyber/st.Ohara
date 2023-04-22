import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../API/API";

const initialState = {
  staffList: [],
  searchValue: "",
  loading: true,
};

export const getStaffData = createAsyncThunk(
  "getStaffData",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await instance
        .get(`users`)
        .then((response) => response.data);
      return response.data.items;
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);
export const addStaff = createAsyncThunk(
  "addStaff",
  async (data, { rejectedWithValue }) => {
    try {
      await instance
        .post(`user`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => response.data);
      return data;
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const editStaff = createAsyncThunk(
  "editStaff",
  async (data, { rejectedWithValue }) => {
    try {
      await instance
        .put(`user`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => response.data);
      return data;
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const deleteStaff = createAsyncThunk(
  "deleteStaff",
  async (id, { rejectedWithValue }) => {
    try {
      return id; //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setSearchValue(state, { payload }) {
      state.searchValue = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //здесь имитируем закгрузку
      .addCase(getStaffData.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(getStaffData.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        state.staffList = payload;
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getStaffData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteStaff.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(deleteStaff.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.staffList = state.staffList.filter((el) => el.id !== payload);
        console.log(payload);
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(deleteStaff.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addStaff.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(addStaff.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.staffList = [...state.staffList, payload];
        console.log(payload);
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(addStaff.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { setSearchValue } = staffSlice.actions;
export default staffSlice.reducer;
