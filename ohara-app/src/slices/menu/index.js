import {createSlice, createSelector, createEntityAdapter, createAsyncThunk} from "@reduxjs/toolkit";
import {mockListMenu} from "./mocks/menu";

const initialState = {
    images: [],
    loading: true,
}
export const getMenuData = createAsyncThunk(
    'getMenuData',
    async (data, {rejectedWithValue}) => {
        const {data, callback} = data;
        try {

            return mockListMenu //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь

        } catch (e) {
            return rejectedWithValue(e)
        }
    }
)
export const deleteItemMenu = createAsyncThunk(
    'deleteItemMenu',
    async (id, {rejectedWithValue}) => {
        try {
            return id //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь

        } catch (e) {
            return rejectedWithValue(e)
        }
    }
)
export const addItemMenu = createAsyncThunk(
    'addItemMenu',
    async (data, {rejectedWithValue}) => {
        try {
            return data

        } catch (e) {
            return rejectedWithValue(e)
        }
    }
)

const menuAdapter = createEntityAdapter();

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
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
            .addCase(deleteItemMenu.pending, state => {
                state.loading = true;
            })
            //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
            .addCase(deleteItemMenu.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.images = state.images.filter((el) => el.id !== payload);
            })
            //здесь можно обрабатывать ошибки. так же прерываем загрузку
            .addCase(deleteItemMenu.rejected, state => {
                state.loading = false;
            })
            .addCase(addItemMenu.pending, state => {
                state.loading = true;
            })
            .addCase(addItemMenu.fulfilled, (state, { payload }) => {
                state.loading = false;
                const findItem = state.images.find((obj) => obj.id !== payload.id);
                if (findItem) {
                   state.images.push({
                        ...payload,
                    });
                }
            })
            //здесь можно обрабатывать ошибки. так же прерываем загрузку
            .addCase(addItemMenu.rejected, state => {
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
