import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../common/api';

// Async Thunk for creating order
export const createOrder = createAsyncThunk(
    'checkout/createOrder',
    async (order, thunkAPI) => {
        const response = await api.checkout.createOrder(order);
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
        clientInfo: null,
        deliveryAddress: null,
        defaultAddress: false,
        cartItems: [],
        deliveryAddresses: [],
        totalPrice: 0,
        status: 'idle',
        error: null,
    },
    reducers: {
        updateStatus:(state,action)=>{
            state.status = 'idle';
        },
        updateClientInfo: (state, action) => {
            state.clientInfo = action.payload;
        },
        updateDeliveryAddress: (state, action) => {
            state.deliveryAddress = action.payload;
        },
        updateCartItems: (state, action) => {
            const cartItems = action.payload;
            let price= 0
            cartItems.forEach(item => {
                price += item.product.price * item.quantity;
            });
            state.totalPrice=price
            state.cartItems = cartItems;
        },
        updateDefaultAddress: (state, action) => {
            state.defaultAddress = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'success';
                state.cartItems = []; // empty the cart after order is placed
                state.clientInfo = null
                state.deliveryAddress = null
                state.totalPrice = 0
                state.error = null
                localStorage.removeItem('cartId');
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

export const {updateClientInfo, updateDeliveryAddress, updateCartItems,updateStatus,updateDefaultAddress} = checkoutSlice.actions;

export default checkoutSlice.reducer;
