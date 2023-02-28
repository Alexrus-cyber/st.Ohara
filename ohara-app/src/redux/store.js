import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import menuReducer from '../slices/menu'
import galleryReducer from '../slices/gallery'
import newsReducer from '../slices/news'
import landingReducer from "../slices/landing"
import {persistReducer} from "redux-persist"
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    menu: menuReducer,
    landing: landingReducer,
    gallery: galleryReducer,
    news: newsReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ //почитай что такое whiteList тут уже в лс все сохраняется)
        'menu',
        'landing',
        'gallery',
        'news',
    ],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
})
