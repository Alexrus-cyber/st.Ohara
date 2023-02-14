import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import menuReducer  from '../slices/menu'
import galleryReducer from '../slices/gallery'
import newsReducer from '../slices/news'
import storage from 'redux-persist/lib/storage';
import {persistReducer} from "redux-persist";

const rootReducer = combineReducers({
    menu: menuReducer,
    galleryReducer,
    newsReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [ //почитай что такое whiteList тут уже в лс все сохраняется)
        'menu'
    ],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
})
