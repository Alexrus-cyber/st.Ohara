import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../API/API";
import { updateObjectInArray } from "./Helper/helper";

const initialState = {
  landingList: {},
  loading: true,
  slider: [],
  header: "",
  error: "",
};
export const getLandingData = createAsyncThunk(
  "getLandingData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`lending`)
        .then((response) => response);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const editLanding = createAsyncThunk(
  "editLanding",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      await instance
        .post(`lending`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => response);
      dispatch(getLandingData());
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const getFile = createAsyncThunk(
  "getFile",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const { file, callback } = data;
      let formData = new FormData();
      formData.append("file", file);
      const response = await instance
        .post(`lending/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => response.data);
      callback(response.data);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const setFile = createAsyncThunk(
  "setFile",
  async (data, { rejectWithValue }) => {
    try {
      const { result, id, section } = data;
      return { result, id, section };
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getSlider = createAsyncThunk(
  "getSlider",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance
        .get(`lending/slider`)
        .then((response) => response);
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const editSlider = createAsyncThunk(
  "editSlider",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      await instance.post(`lending/slider`, data).then((response) => response);
      dispatch(getSlider());
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const deleteSlider = createAsyncThunk(
  "deleteSlider",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await instance
        .delete(`lending/slider/${id}`)
        .then((response) => response);
      dispatch(getSlider());
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    setTitle(state, { payload }) {
      state.header = payload;
    },
    clearError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //здесь имитируем закгрузку
      .addCase(getLandingData.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(getLandingData.fulfilled, (state, { payload }) => {
        state.landingList = { ...payload };
        state.loading = false;
        console.log("Получил");
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getLandingData.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.name;
      })
      .addCase(setFile.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(setFile.fulfilled, (state, { payload }) => {
        if (payload.section === "hero") {
          state.landingList = {
            ...state.landingList,
            bannerDto: {
              ...state.landingList.bannerDto,
              header: state.landingList.bannerDto.header,
              idFile: payload.result.id,
              urlFile: payload.result.file,
            },
          };
        }
        if (payload.section === "about") {
          state.landingList = {
            ...state.landingList,
            aboutDto: updateObjectInArray(
              state.landingList.aboutDto,
              payload.id,
              "id",
              { urlFile: payload.result.file, idFile: payload.result.id }
            ),
          };
        }
        if (payload.section === "atmosphere") {
          state.landingList = {
            ...state.landingList,
            atmosphereDto: updateObjectInArray(
              state.landingList.atmosphereDto,
              payload.id,
              "id",
              { urlFile: payload.result.file, idFile: payload.result.id }
            ),
          };
        }
        state.loading = false;
      })

      .addCase(setFile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSlider.fulfilled, (state, { payload }) => {
        state.slider = [...payload];
      });
  },
});
export const { setTitle, clearError } = landingSlice.actions;
export default landingSlice.reducer;
