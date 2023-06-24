// src/redux/slices/newArrivalsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../common/api';

export const fetchNewArrivals = createAsyncThunk(
    'newArrivals/fetchNewArrivals',
    async (_, { rejectWithValue }) => {
        try {
            return await api.products.getNewArrivals();
        } catch (error) {
            console.error('Error in fetchNewArrivals:', error);
            return rejectWithValue(error.message);
        }
    }
);

const newArrivalsSlice = createSlice({
    name: 'newArrivals',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewArrivals.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchNewArrivals.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload.products;
            })
            .addCase(fetchNewArrivals.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default newArrivalsSlice.reducer;
