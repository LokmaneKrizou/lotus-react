import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import productReducer from './productReducer';
import rtlReducer from './slices/rtlSlice';
const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
});

export default rootReducer;