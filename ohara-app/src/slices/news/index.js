import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../API/API";

const initialState = {
  items: [],
  searchValue: "",
  loading: true,
  oneNew: {},
};
export const getNewsData = createAsyncThunk(
  "getNewsData",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await instance
        .get(`news`)
        .then((response) => response.data);
      return response.data.items;
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const deleteNew = createAsyncThunk(
  "deleteNew",
  async (id, { rejectedWithValue, dispatch }) => {
    try {
      await instance.delete(`news/${id}`).then((response) => response.data);
      dispatch(getNewsData());
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);
export const addNew = createAsyncThunk(
  "addNew",
  async (data, { rejectedWithValue, dispatch }) => {
    try {
      const { header, description, file } = data;
      await instance
        .post(`news`, { header, description })
        .then((response) => response.data);
      await instance.post(`news`, { file }).then((response) => response.data);
      dispatch(getNewsData());
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const editNew = createAsyncThunk(
  "addNew",
  async (data, { rejectedWithValue }) => {
    try {
      await instance.post(`news`, data).then((response) => response.data);
      getNewsData();
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);
export const newsSlice = createSlice({
  name: "newsPage",
  initialState,
  reducers: {
    setSearchValue(state, { payload }) {
      state.searchValue = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //здесь имитируем закгрузку
      .addCase(getNewsData.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(getNewsData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getNewsData.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { setSearchValue } = newsSlice.actions;
export default newsSlice.reducer;
