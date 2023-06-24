import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../common/api';

export const fetchSearchResults = createAsyncThunk(
    'search/fetchSearchResults',
    async ({searchTerm, cursor}, {rejectWithValue}) => {
        try {
            return await api.products.searchProducts(searchTerm, cursor);
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
        pageInfo: {endCursor: null, hasNextPage: false},
        searchTerm: '',
        status: 'idle',
        error: null,
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            state.products = []
            state.pageInfo = {endCursor: null, hasNextPage: false}
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
                if (state.pageInfo.endCursor !== action.payload.pageInfo.endCursor) {
                    state.products = [...state.products, ...action.payload.products]
                }
                state.pageInfo = action.payload.pageInfo;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});
export const {setSearchTerm} = searchSlice.actions;

export default searchSlice.reducer;
