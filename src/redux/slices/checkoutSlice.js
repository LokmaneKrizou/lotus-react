import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../api';

// Async Thunk for creating order
export const createOrder = createAsyncThunk(
    'checkout/createOrder',
    async (order, thunkAPI) => {
        const response = await api.createOrder(order);
        return response.data;
    }
);

// Async Thunk for fetching delivery addresses
export const fetchDeliveryAddresses = createAsyncThunk(
    'checkout/fetchDeliveryAddresses',
    async (_, thunkAPI) => {
        return api.getDeliveryAddresses();
    }
);

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        clientInfo: {},
        deliveryAddress: {},
        cartItems: [],
        deliveryAddresses: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        updateClientInfo: (state, action) => {
            state.clientInfo = action.payload;
        },
        updateDeliveryAddress: (state, action) => {
            state.deliveryAddress = action.payload;
        },
        updateCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'idle';
                state.cartItems = []; // empty the cart after order is placed
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.error.message;
            })
            .addCase(fetchDeliveryAddresses.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchDeliveryAddresses.fulfilled, (state, action) => {
                state.status = 'idle';
                state.deliveryAddresses = action.payload;
            })
            .addCase(fetchDeliveryAddresses.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.error.message;
            });
    },
});

export const {updateClientInfo, updateDeliveryAddress, updateCartItems} = checkoutSlice.actions;

export default checkoutSlice.reducer;
