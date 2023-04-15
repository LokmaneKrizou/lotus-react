import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.products.getCategories();
            return response.categories;
        } catch (error) {
            console.error('Error in fetchCategories:', error);
            return rejectWithValue(error.message);
        }
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default categoriesSlice.reducer;
