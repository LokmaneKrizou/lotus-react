import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../api';

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
    const quantity = state.productDetails.quantity;

    if (!product) {
        return true;
    }

    const selectedProductVariant = product.productVariants.find(variant =>
        variant.options.every(option =>
            state.productDetails.variantSelections.some(selection =>
                selection.name === option.name && selection.value === option.value
            )
        )
    );
    return !selectedProductVariant || quantity > selectedProductVariant.quantity;


};

const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: {
        product: null,
        status: "idle",
        error: null,
        variantSelections: [],
        quantity: 1,
    },
    reducers: {
        setVariantOption: (state, action) => {
            const {variantName, selectedOption} = action.payload;
            console.log(variantName, selectedOption)
            const index = state.variantSelections.findIndex(variant => variant.name === variantName)
            console.log(index)
            if (index === -1) {
                state.variantSelections.push({name: variantName, value: selectedOption})
            } else {
                state.variantSelections[index].value = selectedOption;
            }
        },
        setQuantity: (state, action) => {
            state.quantity = action.payload;
        },
        resetSelection: (state) => {
            state.variantSelections = [];
            state.quantity = 1;
        },
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
    setVariantOption,
    setQuantity,
    resetSelection,
} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
