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
  async (data, { rejectedWithValue }) => {
    try {
      const response = await instance
        .get(`lending`)
        .then((response) => response);
      return response.data;
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const editLanding = createAsyncThunk(
  "editLanding",
  async (data, { rejectedWithValue, dispatch }) => {
    try {
      await instance
        .post(`lending`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => response);
      dispatch(getLandingData());
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);
export const getFile = createAsyncThunk(
  "getFile",
  async (data, { rejectedWithValue }) => {
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
      return rejectedWithValue(e);
    }
  }
);
export const deleteSliderItem = createAsyncThunk(
  "deleteItemMenu",
  async (id, { rejectedWithValue }) => {
    try {
      return id;
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const setFile = createAsyncThunk(
  "setFile",
  async (data, { rejectedWithValue }) => {
    try {
      const { result, id, section } = data;
      console.log(data);
      return { result, id, section };
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const getSlider = createAsyncThunk(
  "getSlider",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await instance
        .get(`lending/slider`)
        .then((response) => response);
      return response.data;
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);
export const editSlider = createAsyncThunk(
  "editSlider",
  async (data, { rejectedWithValue, dispatch }) => {
    try {
      await instance.post(`lending/slider`, data).then((response) => response);
      dispatch(getSlider());
    } catch (e) {
      return rejectedWithValue(e);
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
    setSlider(state, { payload }) {
      state.slider = [...state.slider, payload];
      state.header = "";
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
      })
      .addCase(deleteSliderItem.fulfilled, (state, { payload }) => {
        state.slider = state.slider.filter((el) => el.id !== payload);
      });
  },
});
export const { setTitle, setSlider, clearError } = landingSlice.actions;
export default landingSlice.reducer;
