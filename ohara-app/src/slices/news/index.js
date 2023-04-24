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
  async (id, { rejectedWithValue }) => {
    try {
      await instance.delete(`news/${id}`).then((response) => response.data);
      getNewsData();
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);
export const addNew = createAsyncThunk(
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
      })
      .addCase(deleteNew.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(deleteNew.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = state.items.filter((el) => el.id !== payload);
        console.log(payload);
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(deleteNew.rejected, (state) => {
        state.loading = false;
      })

      .addCase(addNew.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(addNew.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = [...state.items, payload];
        console.log(payload);
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(addNew.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { setSearchValue } = newsSlice.actions;
export default newsSlice.reducer;
