import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { landingList } from "./mocks/landing";

const initialState = {
  landingList: {
    about: {
      items: [],
    },
  },
  loading: true,
};
export const getLandingData = createAsyncThunk(
  "getLandingData",
  async (data, { rejectedWithValue }) => {
    try {
      return landingList; //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const getFile = createAsyncThunk(
  "getFile",
  async ({ file, id, section }, { rejectedWithValue }) => {
    try {
      console.log(file);
      return { img: file, id, section }; //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь
    } catch (e) {
      return rejectedWithValue(e);
    }
  }
);

export const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //здесь имитируем закгрузку
      .addCase(getLandingData.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(getLandingData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.landingList = payload;
        console.log("Получил");
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getLandingData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getFile.pending, (state) => {
        state.loading = true;
      })
      //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
      .addCase(getFile.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload.section === "about") {
          state.landingList = {
            ...state.landingList,
            about: {
              ...state.landingList.about,
              items: state.landingList.about.items.map((value) => {
                if (value.id === payload.id) {
                  return { ...value, img: payload.img };
                }
                return value;
              }),
            },
          };
        }

        if (payload.section === "atmosphere") {
          state.landingList = {
            ...state.landingList,
            atmosphere: {
              ...state.landingList.atmosphere,
              content: state.landingList.atmosphere.content.map((value) => {
                if (value.id === payload.id) {
                  return { ...value, img: payload.img };
                }
                return value;
              }),
            },
          };
        }
      })
      //здесь можно обрабатывать ошибки. так же прерываем загрузку
      .addCase(getFile.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default landingSlice.reducer;
