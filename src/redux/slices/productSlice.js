// redux/slices/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const fetchMostSearchedProducts = createAsyncThunk(
    'products/fetchMostSearchedProducts',
    async () => {
        const response = await api.products.getMostSearchedProducts();
        return response.data;
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMostSearchedProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMostSearchedProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchMostSearchedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducer;
