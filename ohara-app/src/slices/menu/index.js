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
export const getMenuMainData = createAsyncThunk(
  "getMenuMainData",
  async (currentPage, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`menu/main`)
        .then((response) => response.data);
      return response.data; //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const getMenuLaunchData = createAsyncThunk(
  "getMenuLaunchData",
  async (currentPage, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`menu/lunch`)
        .then((response) => response.data);
      return response.data; //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const deleteItemMenu = createAsyncThunk(
  "deleteItemMenu",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { id, launch } = data;
      await instance.delete(`menu/${id}`).then((response) => response.data);
      if (launch) {
        dispatch(getMenuLaunchData());
      } else {
        dispatch(getMenuMainData());
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const uploadMenu = createAsyncThunk(
  "uploadMenu",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      let formData = new FormData();
      for (let file of data) {
        formData.append("file", file);
      }
      const response = await instance
        .post(`menu/upload/main`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => response.data);
      console.log(response.data);
      dispatch(getMenuMainData());
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const uploadMenuLaunch = createAsyncThunk(
  "uploadMenuLaunch",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      let formData = new FormData();
      for (let file of data) {
        formData.append("file", file);
      }
      const response = await instance
        .post(`menu/upload/lunch`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => response.data);
      console.log(response.data);
      dispatch(getMenuLaunchData());
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const swapItemMenu = createAsyncThunk(
  "swapItemMenu",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const { obj, launch } = data;
      console.log(data);
      await instance
        .put(`menu`, obj, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.data);
      if (launch) {
        dispatch(getMenuLaunchData());
      } else {
        dispatch(getMenuMainData());
      }
    } catch (e) {
      return rejectWithValue(e);
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
      .addCase(getMenuLaunchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMenuLaunchData.fulfilled, (state, { payload }) => {
        state.items = payload.items.sort(function (a, b) {
          return a.position - b.position;
        });
        state.loading = false;
      })

      .addCase(getMenuLaunchData.rejected, (state, { payload }) => {
        console.log(Math.floor(payload.response.status / 100));
        if (Math.floor(payload.response.status / 100) === 4) {
          state.error = payload.response.statusText;
        } else {
          state.error = "Ошибка сервера";
        }
      })
      .addCase(getMenuMainData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMenuMainData.fulfilled, (state, { payload }) => {
        state.items = payload.items.sort(function (a, b) {
          return a.position - b.position;
        });
        state.loading = false;
      })

      .addCase(getMenuMainData.rejected, (state, { payload }) => {
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
      });
  },
});
const { reducer, actions } = menuSlice;

//Пример как юзать экшены
export const { clearData } = actions;

const stateSelector = (state) => state?.menu;

export const listMenuSelector = createSelector(
  stateSelector,
  (state) => state.items
);
export default reducer;
