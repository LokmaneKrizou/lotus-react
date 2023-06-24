// src/redux/authSlice.js

import {createSlice} from '@reduxjs/toolkit';
import api from '../../../../common/api';
import Cookies from 'js-cookie';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.user = null;
            state.loading = false;
            state.error = action.payload;
        },
        logoutSuccess: (state) => {
            state.user = null;
        },
        logoutFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchUserSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
    },
});

export const {loginStart, loginSuccess, fetchUserSuccess, loginFailure, logoutSuccess,logoutFailure} = authSlice.actions;


export const login = (userData) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const {user} = await api.auth.login(userData);

        dispatch(loginSuccess(user));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};
export const register = (userData) => async (dispatch) => {
    dispatch(loginStart());
    try {
        await api.auth.signup(userData);
        // Log in the user after successful registration
        const {user} = await api.auth.login(userData);

        dispatch(loginSuccess(user));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};
export const fetchUser = () => async (dispatch) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
        try {
            const user = await api.user.fetchUser();
            dispatch(fetchUserSuccess(user));
        } catch (error) {
            console.error(error);
        }
    }
};
export const signOut = () => async (dispatch) => {
    try {
        await api.auth.logout();
        await Cookies.remove('accessToken');
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFailure(error.message));
    }
};

export default authSlice.reducer;
