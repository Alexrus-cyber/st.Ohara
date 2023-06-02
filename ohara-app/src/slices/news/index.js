import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { instance } from "../API/API";

const initialState = {
  items: [],
  searchValue: "",
  loading: true,
  oneNew: {},
  header: "",
  description: "",
  file: "",
  id: 0,
};
export const getNewsData = createAsyncThunk(
  "getNewsData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`news`)
        .then((response) => response.data);
      return response.data.items;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getNew = createAsyncThunk(
  "getNew",
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`news/${id}`)
        .then((response) => response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteNew = createAsyncThunk(
  "deleteNew",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await instance.delete(`news/${id}`).then((response) => response.data);
      dispatch(getNewsData());
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const addNew = createAsyncThunk(
  "addNew",
  async (data, { rejectWithValue, dispatch }) => {
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
      return rejectWithValue(e);
    }
  }
);

export const editNew = createAsyncThunk(
  "editNew",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      let { id, header, description, file, idFile } = data;
      console.log(idFile);
      if (!idFile) {
        let formData = new FormData();
        formData.append("file", file);
        const response = await instance
          .post(`news/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => response.data);

        idFile = [response.data[0].id];
        console.log(idFile);
        await instance
          .put(
            `news/${id}`,
            { header, description, idFile },
            { headers: { "Content-Type": "application/json" } }
          )
          .then((response) => response.data);
      } else {
        await instance
          .put(
            `news/${id}`,
            { header, description, idFile },
            { headers: { "Content-Type": "application/json" } }
          )
          .then((response) => response.data);
      }
      dispatch(getNewsData());
    } catch (e) {
      return rejectWithValue(e);
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
      })
      .addCase(getNew.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(getNew.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.oneNew = payload;
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getNew.rejected, (state) => {
        state.loading = false;
      });
  },
});

const stateSelector = (state) => state?.news;

export const listNewsSelector = createSelector(
  stateSelector,
  (state) => state.items
);

export const oneNewSelector = createSelector(
  stateSelector,
  (state) => state.oneNew
);

export const { setSearchValue, setTitleR, setTextR, setId } = newsSlice.actions;
export default newsSlice.reducer;
