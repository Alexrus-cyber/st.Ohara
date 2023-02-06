import drinks1 from "../../../assets/MenuDrinks1.jpg";
import drinks2 from "../../../assets/Drinks2.jpg";
import drinks3 from "../../../assets/Drinks3.jpg";
import food1 from "../../../assets/Menu.jpg";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    images: [
        {id: 1 , src: drinks1, activate: false},
        {id: 2 , src: drinks2, activate: false},
        {id: 3 , src: drinks3, activate: false},
    ],
    imagesFood: [
        {id: 1 , src: food1, activate: false},
    ],
    isFood: true,
}
export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers:{
        activatorImages(state, action){
            const findItem = state.images.find((obj) => obj.id === action.payload.id);
            if (findItem){
                (findItem).activate = action.payload.activator;
            }
        },
        activatorImagesFood(state, action){
            const findItem = state.imagesFood.find((obj) => obj.id === action.payload.id);
            if (findItem){
                (findItem).activate = action.payload.activator;
            }
        },
        ChangeFood(state, action){
            state.isFood = action.payload
        }
    }
})

export default menuSlice.reducer;