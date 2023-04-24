import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../API/API";

const initialState = {
  items: [],
  loading: true,
  error: "",
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
      return prompt(rejectedWithValue(e));
    }
  }
);

export const deleteItemGallery = createAsyncThunk(
  "deleteItemGallery",
  async (id, { rejectedWithValue, dispatch }) => {
    try {
      await instance.delete(`gallery/${id}`).then((response) => response.data);
      dispatch(getGalleryData());
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const addItemGallery = createAsyncThunk(
  "addItemGallery",
  async (data, { rejectedWithValue, dispatch }) => {
    try {
      let formData = new FormData();
      for (let file of data) {
        formData.append("file", file);
      }
      const response = await instance
        .post(`gallery`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => response.data);
      console.log(response.data);
      dispatch(getGalleryData());
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
      });
  },
});
export default gallerySlice.reducer;
