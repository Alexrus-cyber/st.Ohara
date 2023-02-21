import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import {landingList} from "./mocks/landing";


const initialState = {
    landingList: {},
    loading:true,
}
export const getLandingData = createAsyncThunk(
    'getLandingData',
    async (data, {rejectedWithValue}) => {
        try {
            return landingList //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь

        } catch (e) {
            return rejectedWithValue(e)
        }
    }
)

export const landingSlice = createSlice({
    name: "landing",
    initialState,
    reducers:{

    },
    extraReducers: builder => {
        builder
            //здесь имитируем закгрузку
            .addCase(getLandingData.pending, state => {
                state.loading = true;
            })
            //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
            .addCase(getLandingData.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.landingList = payload;
                console.log("Получил")
            })
            //здесь можно обрабатывать ошибки. так же прерываем загрузку
            .addCase(getLandingData.rejected, state => {
                state.loading = false;
            })
    }
})



export default landingSlice.reducer;