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
  async (id, { rejectedWithValue, dispatch }) => {
    try {
      await instance.delete(`menu/${id}`).then((response) => response.data);
      dispatch(getMenuData());
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);
export const addItemMenu = createAsyncThunk(
  "addItemMenu",
  async (data, { rejectedWithValue, dispatch }) => {
    try {
      let formData = new FormData();
      for (let file of data) {
        formData.append("file", file);
      }
      await instance
        .post(`menu`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => response.data);
      dispatch(getMenuData());
    } catch (e) {
      return prompt(rejectedWithValue(e));
    }
  }
);

export const swapItemMenu = createAsyncThunk(
  "swapItemMenu",
  async (data, { rejectedWithValue, dispatch }) => {
    try {
      console.log(data);
      await instance
        .put(`menu`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.data);
      dispatch(getMenuData());
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
        console.log(payload);
        state.items = payload.sort(function (a, b) {
          return a.position - b.position;
        });
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getMenuData.rejected, (state) => {
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
