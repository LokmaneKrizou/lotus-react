// src/index.js

import axios from 'axios';
import Cookies from 'js-cookie';
import {Algeria} from "./countries";
import {orderAPI} from "../../features/order/api/orderAPI";
import {checkoutAPI} from "../../features/checkout/api/checkoutAPI";
import {cartAPI} from "../../features/cart/api/cartAPI";
import {productsAPI} from "../../features/product/api/productAPI";
import {authAPI} from "../../features/account/api/authAPI";
import {userAPI} from "../../features/account/api/userAPI";

const API_BASE_URL = 'https://localhost:3000/';


const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
    const accessToken = Cookies.get('accessToken');
    const needsAuth = config.headers.needsAuth;
    delete config.headers.needsAuth; // Remove the custom header
    if (needsAuth && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

const api = {
    products: productsAPI(apiClient),
    cart: cartAPI(apiClient),
    auth: authAPI(apiClient),
    checkout: checkoutAPI(apiClient),
    order: orderAPI(apiClient),
    user: userAPI(apiClient),
    getDeliveryAddresses() {
        return [Algeria]
    }
};
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        originalRequest._retry = false
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshResponse = await api.auth.refreshToken()
                if (refreshResponse.status === "success") {
                    const newAccessToken = Cookies.get('accessToken');
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return apiClient(originalRequest);
                }
            } catch (err) {
                console.log('Failed to refresh token');
                window.dispatchEvent(new CustomEvent('clearUser'));
            }
        }
        return Promise.reject(error);
    }
);
export default api;
