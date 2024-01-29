// orderSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../../../common/api';
import moment from "moment";

const initialState = {
    orders: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    pageInfo: {},
};

// Async thunk action
export const fetchAllOrders = createAsyncThunk(
    'ordersManagement/getAllOrders',
    async (cursor, {rejectWithValue}) => {
        try {
            return await api.ordersManagement.getAllOrders(cursor);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const transformOrderData = (orderData) => {
    const profitAmount = 4000 * orderData.items.reduce((acc, item) => acc + item.quantity, 0);
    const totalAmount = orderData.totalPrice;
    const profitPercentage = (orderData.totalPrice / (orderData.totalPrice - profitAmount)) * 100;
    // Format createdAt date
    moment.locale('en-gb');
    const createdAtDate = moment(orderData.createdAt);
    const formattedDate = createdAtDate.format('DD/MM/YYYY');
    return {
        orderId: orderData._id,
        createdTime: formattedDate, // Formatted date
        customerName: `${orderData.receiver.firstName} ${orderData.receiver.lastName}`,
        user: {name: orderData.user ? `${orderData.user.firstName} ${orderData.user.lastName}` : null,},
        totalAmount: totalAmount, // Ensure the price is in the correct format
        profitAmount: profitAmount,
        profitPercentage: profitPercentage.toFixed(2), // Format to 2 decimal places, allows > 100%
        status: orderData.status,
        items: orderData.items.map((item) => ({
            product: {
                productId: item.product._id,
                name: item.product._id,
                image: (item.product.images && item.product.images.length > 0) ? item.product.images[0] : 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/284607325ceaf75a6043cd20e0ccc2a6.jpg?imageView2/2/w/800/q/70/format/webp',  // Provide a default image URL if images array is empty or not present
                quantity: item.quantity,
                price: item.price,
            },
            variantSelections: item.variantSelections.map(variant => ({
                name: variant.name,
                value: variant.value
            }))
        }))
    };
};
export const ordersManagementSlice = createSlice({
    name: 'ordersManagement',
    initialState,
    reducers: {
        // Add reducers if you have any
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload.orders.map(transformOrderData);
                state.pageInfo = action.payload.pageInfo;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export default ordersManagementSlice.reducer;
