import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../../common/api';

export const fetchOrders = createAsyncThunk('orders/fetchOrders',
    async () => {
        const response = await api.order.getOrders();
        return response.data;
    });

export const cancelOrder = createAsyncThunk('orders/cancelOrder',
    async (orderId) => {
        await api.order.cancelOrder(orderId);
        return orderId;
    });

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        status: 'idle',
        error: null,
        orders: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.status = "idle"
            })
            .addCase(fetchOrders.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.error.message;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.status = "order_canceled"
            })
            .addCase(cancelOrder.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.status = "idle"
                state.error = action.error.message;
            });
    }
});

export default ordersSlice.reducer;
