import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../API/API";

const initialState = {
  items: [],
  loading: true,
};
export const getGalleryData = createAsyncThunk(
  "getGalleryData",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await instance
        .get(`gallery`)
        .then((response) => response.data);
      return response.data.items; //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const deleteItemGallery = createAsyncThunk(
  "deleteItemGallery",
  async (id, { rejectedWithValue }) => {
    try {
      return id; //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const addItemGallery = createAsyncThunk(
  "addItemGallery",
  async (file, { rejectedWithValue }) => {
    try {
      return file; //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);
export const swapItemGallery = createAsyncThunk(
  "swapItemGallery",
  async (data, { rejectedWithValue }) => {
    try {
      return data; //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    clearData: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //здесь имитируем закгрузку
      .addCase(getGalleryData.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(getGalleryData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getGalleryData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteItemGallery.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(deleteItemGallery.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = state.items.filter((el) => el.id !== payload);
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(deleteItemGallery.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addItemGallery.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemGallery.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = [payload, ...state.items];
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(addItemGallery.rejected, (state) => {
        state.loading = false;
      })
      .addCase(swapItemGallery.pending, (state) => {
        state.loading = true;
      })
      .addCase(swapItemGallery.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(swapItemGallery.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default gallerySlice.reducer;
