import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { staffList } from "./mocks";

const initialState = {
  staffList: [],
  searchValue: "",
  loading: true,
};

export const getStaffData = createAsyncThunk(
  "getStaffData",
  async (data, { rejectedWithValue }) => {
    try {
      return staffList; //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь
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
      });
  },
});
export const { setSearchValue } = staffSlice.actions;
export default staffSlice.reducer;
