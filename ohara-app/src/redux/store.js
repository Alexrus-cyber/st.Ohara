import {combineReducers, configureStore} from "@reduxjs/toolkit";
import menuReducer from '../slices/menu'
import galleryReducer from '../slices/gallery'
import newsReducer from '../slices/news'

const rootReducer = combineReducers({
    menuReducer,
    galleryReducer,
    newsReducer
})

export const store = configureStore({
    reducer: rootReducer,
})
