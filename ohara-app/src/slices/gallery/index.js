import slider1 from "../../assets/slider1.png";
import slider2 from "../../assets/slider2.png";
import slider3 from "../../assets/slider3.png";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    images: [
        {id: 1, src: slider1, activate: false},
        {id: 2, src: slider3, activate: false},
        {id: 3, src: slider2, activate: false},
        {id: 4, src: slider1, activate: false},
        {id: 5, src: slider3, activate: false},
        {id: 6, src: slider1, activate: false},
        {id: 7, src: slider2, activate: false},
        {id: 8, src: slider3, activate: false},
    ],

}
export const gallerySlice = createSlice({
        name: 'gallery',
        initialState,
        reducers: {
            activatorImages(state, action){
                const findItem = state.images.find((obj) => obj.id === action.payload.id);
                if (findItem){
                    (findItem).activate = action.payload.activator;
                }
            },
            NextImage(state, action){
                const findItem = state.images.find((obj) => obj.id === action.payload.id);
                if (findItem){
                    (findItem).activate = action.payload.activator;
                }
            },
        }
    }
)

export default gallerySlice.reducer;