import {configureStore} from '@reduxjs/toolkit';
import rtlReducer from './slices/rtlSlice';
import productReducer from './slices/productSlice';
import categoriesReducer from './slices/categoriesSlice';
import mostSearchedProductsReducer from './slices/mostSearchedProductsSlice';
import newArrivalsReducer from './slices/newArrivalsSlice';
import searchReducer from './slices/searchSlice';

const store = configureStore({
    reducer: {
        rtl: rtlReducer,
        products: productReducer,
        search: searchReducer,
        categories: categoriesReducer,
        mostSearchedProducts: mostSearchedProductsReducer,
        newArrivals: newArrivalsReducer
    }
});

export default store;