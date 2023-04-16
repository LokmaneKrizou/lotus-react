import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// Async Thunk to fetch product details
export const fetchProductDetails = createAsyncThunk(
    'productDetails/fetchProductDetails',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await api.products.getProductDetails(productId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: {
        product: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.product = action.payload;
                state.error = null;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default productDetailsSlice.reducer;
