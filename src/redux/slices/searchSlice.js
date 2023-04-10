// src/redux/slices/searchSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../api';

export const fetchSearchResults = createAsyncThunk(
    'search/fetchSearchResults',
    async (searchTerm, { rejectWithValue }) => {
        try {
            return await api.products.searchProducts(searchTerm);
        } catch (error) {
            console.error('Error in fetchSearchResults:', error);
            return rejectWithValue(error.message);
        }
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        products: [],
        searchTerm: '',
        status: 'idle',
        error: null,
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload)
                state.products = action.payload.products;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});
export const { setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
