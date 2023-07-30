// src/redux/slices/cartSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../common/api';
import {logoutSuccess} from "../../account/redux/authSlice";

const initialState = {
    cart: {
        id: null,
        user: null,
        items: [],
    },
    status: 'idle',
    error: null,
};
export const addItemToCartAction = () => async (dispatch, getState) => {
    try {
        const state = getState();
        const {cart} = state.cart;
        const items = cart.items;
        const result = items.map((item) => {
            return {
                product: item.product._id,
                variantSelections: item.variantSelections,
                quantity: item.quantity
            };
        });
        if (cart.id) {
            await dispatch(updateCart({cartId: cart.id, items: result}));
        } else {
            const newCart = await dispatch(createCart({items: result}));
            if (newCart.payload && newCart.payload._id && !newCart.payload.user) {
                localStorage.setItem('cartId', newCart.payload._id);
            }
        }
        return {success: true}; // Return postCheckout flag
    } catch (error) {
        console.error('Failed to add item to cart:', error);
    }
};
export const refreshCart = () => async (dispatch, getState) => {
    try {
        const state = getState();
        const {cart} = state.cart;
        const items = cart.items;
        await dispatch(updateCart({cartId: cart.id, items: items}));
    } catch (error) {
        console.error('Failed to add item to cart:', error);
    }
}
export const createCart = createAsyncThunk(
    'cart/createCart',
    async ({items}, {rejectWithValue}) => {
        try {

            return await api.cart.createCart(items);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getMyCart = createAsyncThunk(
    'cart/getMyCart',
    async ({rejectWithValue}) => {
        try {
            return await api.cart.getMyCart();
        } catch (error) {

            return rejectWithValue(error.response.data);
        }
    }
);

export const handleCartOptions = createAsyncThunk(
    'cart/handleCartOptions',
    async ({option}, {rejectWithValue}) => {
        try {
            console.log(option)
            const localCartId = localStorage.getItem('cartId');
            return await api.cart.handleCartOptions(localCartId, option);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCart = createAsyncThunk(
    'cart/updateCart',
    async ({cartId, items}, {rejectWithValue}) => {
        try {
            return await api.cart.updateCart(cartId, items);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCart = createAsyncThunk(
    'cart/deleteCart',
    async (cartId, {rejectWithValue}) => {
        try {
            await api.cart.deleteCart(cartId);
            return cartId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCartById = createAsyncThunk(
    'cart/getCartById',
    async (cartId, {rejectWithValue}) => {
        try {
            return await api.cart.getCartById(cartId);
        } catch (error) {
            localStorage.removeItem('cartId');
            return rejectWithValue(error.response.data);
        }
    }
);

function findIndexOfSimilarItem(items, newItem) {
    return items.findIndex((item) => {
        if (item.product._id !== newItem.product._id) {
            return false;
        }
        return item.variantSelections.every((itemVariant) =>
            newItem.variantSelections.some((newVariant) =>
                newVariant.name === itemVariant.name
                && newVariant.value === itemVariant.value
            )
        );
    });
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItemIndex = findIndexOfSimilarItem(state.cart.items, newItem);
            if (existingItemIndex !== -1) {
                state.cart.items[existingItemIndex].quantity += newItem.quantity;
            } else {
                state.cart.items.push(newItem);
            }
        },
        removeFromCart: (state, action) => {
            const itemToDelete = action.payload;
            const existingItemIndex = findIndexOfSimilarItem(state.cart.items, itemToDelete);
            if (existingItemIndex !== -1) {
                state.cart.items.splice(existingItemIndex, 1);
            }
        },
        updateQuantity: (state, action) => {
            const updatedItem = action.payload;
            const existingItemIndex = findIndexOfSimilarItem(state.cart.items, updatedItem);
            if (existingItemIndex !== -1) {
                state.cart.items[existingItemIndex].quantity = updatedItem.quantity;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            //CREATE CART
            .addCase(createCart.pending, (state, action) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createCart.fulfilled, (state, action) => {
                if (!action.payload.user) {
                    localStorage.setItem('cartId', action.payload._id);
                }
                state.cart = {id: action.payload._id, ...action.payload};
                state.status = 'succeeded';
            })
            .addCase(createCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            //UPDATE CART
            .addCase(updateCart.pending, (state, action) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cart = {id: action.payload._id, ...action.payload};
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // GET MY CART
            .addCase(getMyCart.pending, (state, action) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getMyCart.fulfilled, (state, action) => {
                state.cart = {id: action.payload._id, ...action.payload};
                state.status = 'succeeded';
            })
            .addCase(getMyCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // DELETE CART
            .addCase(deleteCart.pending, (state, action) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.cart = {id: null, user: null, items: []};
                state.status = 'succeeded';
            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // GET CART BY ID
            .addCase(getCartById.pending, (state, action) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getCartById.fulfilled, (state, action) => {
                console.log(JSON.stringify(action.payload, null, 2))
                state.cart = {id: action.payload._id, ...action.payload};
                state.status = 'succeeded';
            })
            .addCase(getCartById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })  // HANDLE CART OPTIONS
            .addCase(handleCartOptions.pending, (state, action) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(handleCartOptions.fulfilled, (state, action) => {
                console.log(JSON.stringify(action.payload, null, 2))
                state.cart = {id: action.payload._id, ...action.payload};
                state.status = 'succeeded';
            })
            .addCase(handleCartOptions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logoutSuccess, (state) => {
                state.cart = {
                    id: null,
                    user: null,
                    items: [],
                };
                state.loading = false;
                state.error = null;
            });
    }
});

export const {addToCart, removeFromCart, updateQuantity} = cartSlice.actions;

export default cartSlice.reducer;
