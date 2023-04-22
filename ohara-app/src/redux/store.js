import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import menuReducer from "../slices/menu";
import galleryReducer from "../slices/gallery";
import newsReducer from "../slices/news";
import landingReducer from "../slices/landing";
import staffReducer from "../slices/staff";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer as formReducer } from "redux-form";
import authReducer from "../slices/AuthApi";

const rootReducer = combineReducers({
  menu: menuReducer,
  landing: landingReducer,
  gallery: galleryReducer,
  news: newsReducer,
  staff: staffReducer,
  login: authReducer,
  form: formReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    //почитай что такое whiteList тут уже в лс все сохраняется)
    "menu",
    "landing",
    "gallery",
    "newsPage",
    "staff",
    "login",
  ],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
