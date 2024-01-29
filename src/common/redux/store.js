import {configureStore} from '@reduxjs/toolkit';
import rtlReducer from '../../features/navbar/redux/rtlSlice';
import categoriesReducer from '../../features/home/redux/categoriesSlice';
import mostSearchedProductsReducer from '../../features/home/redux/mostSearchedProductsSlice';
import newArrivalsReducer from '../../features/home/redux/newArrivalsSlice';
import searchReducer from '../../features/search/redux/searchSlice';
import productDetailsReducer from '../../features/product/redux/productDetailsSlice';
import cartReducer from '../../features/cart/redux/cartSlice'
import authReducer from '../../features/account/redux/authSlice'
import checkoutReducer from '../../features/checkout/redux/checkoutSlice'
import orderReducer from '../../features/order/redux/orderSLice'
import ordersManagementReducer from '../../admin/features/orders/redux/orderManagmentSlice'

const store = configureStore({
    reducer: {
        rtl: rtlReducer,
        search: searchReducer,
        categories: categoriesReducer,
        mostSearchedProducts: mostSearchedProductsReducer,
        newArrivals: newArrivalsReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        auth: authReducer,
        checkout: checkoutReducer,
        order: orderReducer,
        adminOrders:ordersManagementReducer,

    }
});

export default store;