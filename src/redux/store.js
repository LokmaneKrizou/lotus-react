import {configureStore} from '@reduxjs/toolkit';
import rtlReducer from './slices/rtlSlice';
import productsSlice from './slices/productSlice';

const store = configureStore({
    reducer: {
        rtl: rtlReducer,
        products: productsSlice
    }
});

export default store;