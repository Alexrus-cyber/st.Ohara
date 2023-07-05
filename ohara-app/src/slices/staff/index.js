import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../API/API";
import { getMe } from "../AuthApi";

const initialState = {
  staffList: [],
  searchValue: "",
  loading: true,
};
export const getStaffData = createAsyncThunk(
  "getStaffData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`users`)
        .then((response) => response.data);
      return response.data.items;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const addStaff = createAsyncThunk(
  "addStaff",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      await instance
        .post(`user`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => response.data);
      dispatch(getStaffData());
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const editStaff = createAsyncThunk(
  "editStaff",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { id, ...rest } = data;
      await instance
        .put(`user/${id}`, rest, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => response.data);
      await dispatch(getMe());
      dispatch(getStaffData());
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteStaff = createAsyncThunk(
  "deleteStaff",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await instance.delete(`user/${id}`).then((response) => response.data);
      dispatch(getStaffData());
    } catch (e) {
      return rejectWithValue(e);
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
        state.staffList = payload;
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getStaffData.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { setSearchValue } = staffSlice.actions;
export default staffSlice.reducer;
