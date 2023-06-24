import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../common/api';

export const fetchMostSearchedProducts = createAsyncThunk(
    'mostSearchedProducts/fetchMostSearchedProducts',
    async (_, { rejectWithValue }) => {
        try {
            return await api.products.getMostSearchedProducts()
        } catch (error) {
            console.error('Error in fetchMostSearchedProducts:', error);
            return rejectWithValue(error.message);
        }
    }
);

const mostSearchedProductsSlice = createSlice({
    name: 'mostSearchedProducts',
    initialState: {
        products: [],
        trendingProduct: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMostSearchedProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMostSearchedProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
                state.trendingProduct = action.payload.length ? action.payload[0] : null;
            })
            .addCase(fetchMostSearchedProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default mostSearchedProductsSlice.reducer;
