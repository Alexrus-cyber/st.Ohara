import {createSlice, createSelector, createEntityAdapter, createAsyncThunk} from "@reduxjs/toolkit";
import {mockListMenu} from "../../mocks/menu";

const initialState = {
    images: [],
    loading: false,
}

export const getMenuData = createAsyncThunk(
    'getMenuData',
    async (data, {rejectedWithValue}) => {
        try {
            return mockListMenu //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь

        } catch (e) {
            return rejectedWithValue(e)
        }
    }
)

const menuAdapter = createEntityAdapter();

export const menuSlice = createSlice({
    name: 'menu',
    initialState: menuAdapter.getInitialState(initialState),
    reducers:{
        clearData: state => {
            state.images = [];
        },
    },
    extraReducers: builder => {
        builder
            //здесь имитируем закгрузку
            .addCase(getMenuData.pending, state => {
                state.loading = true;
            })
            //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
            .addCase(getMenuData.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.images = payload;
            })
            //здесь можно обрабатывать ошибки. так же прерываем загрузку
            .addCase(getMenuData.rejected, state => {
                state.loading = false;
            })
    }
})

const { reducer, actions } = menuSlice;

//Пример как юзать экшены
export const { clearData } = actions;

const stateSelector = state => state?.menu;

export const listImagesSelector = createSelector(stateSelector, state => state.images);

export default reducer;