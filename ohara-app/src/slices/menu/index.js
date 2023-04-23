import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { instance } from "../API/API";

const initialState = {
  items: [],
  loading: true,
};
export const getMenuData = createAsyncThunk(
  "getMenuData",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await instance
        .get(`menu`)
        .then((response) => response.data);
      return response.data.items; //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);
export const deleteItemMenu = createAsyncThunk(
  "deleteItemMenu",
  async (id, { rejectedWithValue }) => {
    try {
      await instance.delete(`menu/${id}`).then((response) => response.data);
      return id;
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);
export const addItemMenu = createAsyncThunk(
  "addItemMenu",
  async (data, { rejectedWithValue }) => {
    try {
      let formData = new FormData();
      formData.append("file", data);
      const response = await instance
        .post(`menu`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => response.data);
      return response.data;
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const swapItemMenu = createAsyncThunk(
  "swapItemMenu",
  async (data, { rejectedWithValue }) => {
    try {
      await instance
        .put(`menu`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.data);
      return data;
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    clearData: (state) => {
      state.images = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //здесь имитируем закгрузку
      .addCase(getMenuData.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(getMenuData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getMenuData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteItemMenu.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(deleteItemMenu.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = state.items.filter((el) => el.id !== payload);
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(deleteItemMenu.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addItemMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemMenu.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = [...state.items, ...payload];
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(addItemMenu.rejected, (state) => {
        state.loading = false;
      })
      .addCase(swapItemMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(swapItemMenu.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(swapItemMenu.rejected, (state) => {
        state.loading = false;
      });
  },
});
const { reducer, actions } = menuSlice;

//Пример как юзать экшены
export const { clearData } = actions;

const stateSelector = (state) => state?.menu;

export const listImagesSelector = createSelector(
  stateSelector,
  (state) => state.items
);
export default reducer;
