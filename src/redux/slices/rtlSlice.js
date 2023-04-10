// src/slices/rtlSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const rtlSlice = createSlice({
    name: 'rtl',
    initialState: {
        isRtl: false,
    },
    reducers: {
        toggleRtl: (state) => {
            state.isRtl = !state.isRtl;
        },
    },
});

export const { toggleRtl } = rtlSlice.actions;
export default rtlSlice.reducer;
