import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { instance } from "../API/API";

const initialState = {
  items: [],
  loading: true,
  error: "",
};
export const getMenuData = createAsyncThunk(
  "getMenuData",
  async (currentPage, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`menu`)
        .then((response) => response.data);
      return response.data; //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь
    } catch (e) {
      return rejectWithValue(e);
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
      return rejectedWithValue(e);
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
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //здесь имитируем закгрузку

      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(getMenuData.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.items = payload.items.sort(function (a, b) {
          return a.position - b.position;
        });
      })

      .addCase(getMenuData.rejected, (state, { payload }) => {
        console.log(Math.floor(payload.response.status / 100));
        if (Math.floor(payload.response.status / 100) === 4) {
          state.error = payload.response.statusText;
        } else {
          state.error = "Ошибка сервера";
        }
      })
      .addCase(deleteItemMenu.rejected, (state, { error }) => {
        state.error = error.name;
      })
      .addCase(swapItemMenu.rejected, (state, { error }) => {
        state.error = error.name;
      })
      .addCase(addItemMenu.rejected, (state, { error }) => {
        state.error = error.name;
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
