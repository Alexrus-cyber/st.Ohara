import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../API/API";

const initialState = {
  items: [],
  searchValue: "",
  loading: true,
  oneNew: {},
  header: "",
  description: "",
  file: "",
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
      let formData = new FormData();
      formData.append("file", file);
      const response = await instance
        .post(`news/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => response.data);
      const idFile = [response.data[0].id];
      if (idFile) {
        await instance
          .post(
            `news`,
            { header, description, idFile },
            { headers: { "Content-Type": "application/json" } }
          )
          .then((response) => response.data);
      }
      dispatch(getNewsData());
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const editNew = createAsyncThunk(
  "editNew",
  async (data, { rejectedWithValue }) => {
    try {
      const { header, description, file } = data;
      /*let formData = new FormData();
      formData.append("file", file);
      const response = await instance
        .post(`news/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => response.data);*/
      console.log(file);
      const idFile = undefined;
      if (idFile) {
        await instance
          .post(
            `news`,
            { header, description, idFile },
            { headers: { "Content-Type": "application/json" } }
          )
          .then((response) => response.data);
      }
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
    setTitleR(state, { payload }) {
      state.header = payload;
    },
    setTextR(state, { payload }) {
      state.description = payload;
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
export const { setSearchValue, setTitleR, setTextR } = newsSlice.actions;
export default newsSlice.reducer;
