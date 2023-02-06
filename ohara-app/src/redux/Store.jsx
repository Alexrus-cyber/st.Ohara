import {combineReducers, configureStore} from "@reduxjs/toolkit";
import menuReducer from '../pages/Menu/slice'
import galleryReducer from '../pages/Gallery/slice'

const rootReducer = combineReducers({
    menuReducer,
    galleryReducer
})

export const store = configureStore({
    reducer: rootReducer,
})
