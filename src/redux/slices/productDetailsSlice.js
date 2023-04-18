import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../api';

// Async Thunk to fetch product details
export const fetchProductDetails = createAsyncThunk(
    'productDetails/fetchProductDetails',
    async (productId, {rejectWithValue}) => {
        try {
            const response = await api.products.getProductDetails(productId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const isAddToCartDisabled = (state) => {
    const product = state.productDetails.product;
    const sizeSelected = state.productDetails.size !== null;
    const colorSelected = state.productDetails.color !== null;
    const quantity = product ? product.totalQuantity : 0;

    if (quantity === 0) {
        return true;
    }

    if (product.sizes?.length > 1 && !sizeSelected) {
        return true;
    }

    if (product.colors?.length > 1 && !colorSelected) {
        return true;
    }

    return false;
};

const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: {
        product: null,
        status: "idle",
        error: null,
        size: null,
        color: null,
        quantity: 1,
    },
    reducers: {
        setSize: (state, action) => {
            state.size = action.payload;
        },
        setColor: (state, action) => {
            state.color = state.product.colors.find((color) => color.name === action.payload);
        },
        setQuantity: (state, action) => {
            state.quantity = action.payload;
        },
        resetSelection: (state) => {
            state.size = null;
            state.color = null;
            state.quantity = 1;
        },
        // Keep the existing reducers
    },
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
    }
});
export const {
    setSize,
    setColor,
    setQuantity,
    resetSelection,
    // Keep the existing action creators
} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
