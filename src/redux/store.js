import {configureStore} from '@reduxjs/toolkit';
import rtlReducer from './slices/rtlSlice';
import productReducer from './slices/productSlice';
import categoriesReducer from './slices/categoriesSlice';
import mostSearchedProductsReducer from './slices/mostSearchedProductsSlice';
import newArrivalsReducer from './slices/newArrivalsSlice';
import searchReducer from './slices/searchSlice';
import productDetailsReducer from './slices/productDetailsSlice';
import cartReducer from './slices/cartSlice'
import authReducer from  './slices/authSlice'
import checkoutReducer from  './slices/checkoutSlice'

const store = configureStore({
    reducer: {
        rtl: rtlReducer,
        products: productReducer,
        search: searchReducer,
        categories: categoriesReducer,
        mostSearchedProducts: mostSearchedProductsReducer,
        newArrivals: newArrivalsReducer,
        productDetails: productDetailsReducer,
        cart:cartReducer,
        auth:authReducer,
        checkout:checkoutReducer
    }
});

export default store;