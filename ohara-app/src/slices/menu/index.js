import drinks1 from "../../assets/MenuDrinks1.jpg";
import drinks2 from "../../assets/Drinks2.jpg";
import drinks3 from "../../assets/Drinks3.jpg";
import food1 from "../../assets/Menu.jpg";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    images: [
        {id: 0 , src: drinks1},
        {id: 1 , src: drinks2},
        {id: 2 , src: drinks3},
        {id: 3 , src: food1},
    ],
}
export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers:{

    }
})

export default menuSlice.reducer;