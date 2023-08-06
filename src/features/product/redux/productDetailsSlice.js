import {createAsyncThunk, createSlice, createSelector} from '@reduxjs/toolkit';
import api from '../../../common/api';
import {addItemToCartAction, addToCart} from "../../cart/redux/cartSlice";

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

export const addToCartAction = createAsyncThunk(
    'productDetails/addToCart',
    async (_, {dispatch, getState}) => {
        const {productDetails} = getState();
        const item = {
            product: productDetails.product,
            variantSelections: productDetails.variantSelections,
            quantity: productDetails.quantity,
        };
        dispatch(addToCart(item));
        const result = await dispatch(addItemToCartAction());
        return result.success;
    }
);

const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: {
        product: null,
        status: "idle",
        error: null,
        variantSelections: [],
        quantity: 1,
        selectedVariantQuantity: 10,
        addToCartButtonLabel: 'Add to Cart'
    },
    reducers: {
        setVariantOption: (state, action) => {
            const {variantName, selectedOption} = action.payload;
            const index = state.variantSelections.findIndex(variant => variant.name === variantName)
            if (index === -1) {
                state.variantSelections.push({name: variantName, value: selectedOption})
            } else {
                state.variantSelections[index].value = selectedOption;
            }

            const selectedProductVariant = state.product.productVariants.find(variant =>
                variant.options.every(option =>
                    state.variantSelections.some(selection =>
                        selection.name === option.name && selection.value === option.value
                    )
                )
            );

            state.selectedVariantQuantity = selectedProductVariant ? selectedProductVariant.quantity : state.product.totalQuantity;
            state.addToCartButtonLabel = state.selectedVariantQuantity === 0 ? 'Sold Out' : 'Add to Cart';
        },
        setQuantity: (state, action) => {
            state.quantity = action.payload;
        },
        toggleSideMenu: (state) => {
            state.sideMenuVisible = !state.sideMenuVisible;
        },
        toggleErrorDialog: (state) => {
            state.errorDialogVisible = !state.errorDialogVisible;
        },
        resetSelection: (state) => {
            state.variantSelections = [];
            state.quantity = 1;
            state.addToCartButtonLabel = 'Add to Cart';
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
            })
            .addCase(addToCartAction.fulfilled, (state, action) => {
                state.sideMenuVisible = action.payload;
                state.errorDialogVisible = !action.payload;
            });
    }
});

export const {
    setVariantOption,
    setQuantity,
    resetSelection,
    toggleSideMenu,
    toggleErrorDialog,
} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;

// Selectors
const selectProductDetails = state => state.productDetails;

export const selectSelectedVariantQuantity = createSelector(
    [selectProductDetails],
    productDetails => productDetails.selectedVariantQuantity
);
export const selectIsVariantSelected = createSelector(
    [selectProductDetails],
    (productDetails) => {
        const {product, variantSelections} = productDetails;
        if (!product || !product.variants) {
            return false;
        }
        return product.variants.every(variant => variantSelections.some(selection => selection.name === variant.name));
    }
);
export const selectIsAddToCartDisabled = createSelector(
    [selectProductDetails, selectSelectedVariantQuantity, selectIsVariantSelected],
    (productDetails, selectedVariantQuantity, isVariantSelected) => selectedVariantQuantity === 0 || productDetails.quantity > selectedVariantQuantity || !isVariantSelected
);


export const selectQuantityOptions = createSelector(
    [selectSelectedVariantQuantity],
    (selectedVariantQuantity) => [...Array(selectedVariantQuantity > 10 ? 10 : selectedVariantQuantity).keys()].map((n) => n + 1)
);


export const selectAddToCartButtonLabel = createSelector(
    [selectProductDetails],
    (productDetails) => productDetails.addToCartButtonLabel
);
