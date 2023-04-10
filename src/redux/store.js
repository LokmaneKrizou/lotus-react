import {configureStore} from '@reduxjs/toolkit';
import rtlReducer from './slices/rtlSlice';
import productReducer from './slices/productSlice';
import searchReducer from './slices/searchSlice';

const store = configureStore({
    reducer: {
        rtl: rtlReducer,
        products: productReducer,
        search: searchReducer,
    }
});

export default store;