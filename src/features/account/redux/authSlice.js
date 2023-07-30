// src/redux/authSlice.js

import {createSlice} from '@reduxjs/toolkit';
import api from '../../../common/api';
import Cookies from 'js-cookie';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: true,
        error: null,
        passwordChangeSuccess: false
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
            state.passwordChangeSuccess = false;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
            state.passwordChangeSuccess = false;
        },
        loginFailure: (state, action) => {
            state.user = null;
            state.loading = false;
            state.passwordChangeSuccess = false;
            state.error = action.payload;
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.passwordChangeSuccess = false;
        },
        logoutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchUserSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
            state.passwordChangeSuccess = false;
        },
        passwordChangeSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
            state.passwordChangeSuccess = true;
        },
        passwordChangeFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.passwordChangeSuccess = false;
        },
        passwordChangeReset: (state) => {
            state.passwordChangeSuccess = false;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    fetchUserSuccess,
    loginFailure,
    logoutSuccess,
    logoutFailure,
    passwordChangeSuccess,
    passwordChangeReset,
    passwordChangeFailure
} = authSlice.actions;


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
        console.log(error)
        dispatch(loginFailure(error.response.data));
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
export const updateUser = (data) => async (dispatch) => {
    try {
        const user = await api.user.updateUser(data);
        dispatch(fetchUserSuccess(user));
    } catch (error) {
        console.error(error);
    }
};
export const changePassword = (data) => async (dispatch) => {
    try {
        const user = await api.user.changePassword(data);
        dispatch(passwordChangeSuccess(user));
    } catch (error) {
        console.error(error);
        dispatch(passwordChangeFailure(error.response.data));
    }
};
export const deleteUser = () => async (dispatch) => {
    try {
        await api.user.deleteUser();
        await Cookies.remove('accessToken');
        dispatch(logoutSuccess());
    } catch (error) {
        console.error(error);
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
