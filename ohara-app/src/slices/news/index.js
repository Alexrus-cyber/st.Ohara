import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {NewData, newsData} from "./mocks/news";


const initialState = {
    news: [],
    searchValue: '',
    loading: true,
    oneNew: {}
}
export const getNewsData = createAsyncThunk(
    'getNewsData',
    async (data, {rejectedWithValue}) => {
        try {
            return newsData //картинки замоканные у нас на фронте обычно здесь запрос выполняется и данные получаешь

        } catch (e) {
            return rejectedWithValue(e)
        }
    }
)
export const getNew = createAsyncThunk(
    'getNew',
    async (data, {rejectedWithValue}) => {
        try {
            return NewData

        } catch (e) {
            return rejectedWithValue(e)
        }
    }
)
export const deleteNew = createAsyncThunk(
    'deleteNew',
    async (id, {rejectedWithValue}) => {
        try {
            return id
        } catch (e) {
            return rejectedWithValue(e)
        }
    }
)
export const addNew = createAsyncThunk(
    'addNew',
    async (data, {rejectedWithValue}) => {
        try {
            return data

        } catch (e) {
            return rejectedWithValue(e)
        }
    }
)
export const newsSlice = createSlice({
        name: 'newsPage',
        initialState,
        reducers: {
            setSearchValue(state, {payload}) {
                state.searchValue = payload;
            },
        },
        extraReducers:builder => {
            builder
                //здесь имитируем закгрузку
                .addCase(getNewsData.pending, state => {
                    state.loading = true;
                })
                //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
                .addCase(getNewsData.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.news = payload;
                })
                //здесь можно обрабатывать ошибки. так же прерываем загрузку
                .addCase(getNewsData.rejected, state => {
                    state.loading = false;
                })

                .addCase(getNew.pending, state => {
                    state.loading = true;
                })
                //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
                .addCase(getNew.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.oneNew = payload;
                    console.log("Получил")
                })
                //здесь можно обрабатывать ошибки. так же прерываем загрузку
                .addCase(getNew.rejected, state => {
                    state.loading = false;
                })
                .addCase(deleteNew.pending, state => {
                    state.loading = true;
                })
                //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
                .addCase(deleteNew.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.news = state.news.filter((el) => el.id !== payload);
                    console.log(payload)
                })
                //здесь можно обрабатывать ошибки. так же прерываем загрузку
                .addCase(deleteNew.rejected, state => {
                    state.loading = false;
                })

                .addCase(addNew.pending, state => {
                    state.loading = true;
                })
                //полученные данные из запроса мы кладем в стор редакса. прерываем загрузку
                .addCase(addNew.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    state.news = [...state.news, payload]
                    console.log(payload)
                })
                //здесь можно обрабатывать ошибки. так же прерываем загрузку
                .addCase(addNew.rejected, state => {
                    state.loading = false;
                })
        }
    }
)
export const { setSearchValue } = newsSlice.actions;
export default newsSlice.reducer;