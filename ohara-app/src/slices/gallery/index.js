import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { galleryData } from "./mocks/gallery";

const initialState = {
  images: [],
  loading: true,
};
export const getGalleryData = createAsyncThunk(
  "getGalleryData",
  async (data, { rejectedWithValue }) => {
    try {
      return galleryData; //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь
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
  async (id, { rejectedWithValue }) => {
    try {
      return id; //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь
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
      state.images = [];
    },
    reOrderList: (state, { payload }) => {
      state.images = payload;
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
        state.images = payload.reverse();
        console.log("Получил");
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
        state.images = state.images.filter((el) => el.id !== payload);
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
        state.images = [payload, ...state.images];
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(addItemGallery.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { reOrderList } = gallerySlice.actions;
export default gallerySlice.reducer;
