// src/index.js

import axios from 'axios';
import Cookies from 'js-cookie';
import {Algeria} from "./countries";

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
    products: {
        async getCategories() {
            const response = await apiClient.get('/products/categories');
            return response.data;
        },

        async getMostSearchedProducts() {
            const response = await apiClient.get('/products/mostSearched', {
                params: {limit: 10},
            });
            return response.data;
        },

        async getNewArrivals() {
            const response = await apiClient.get('/products/newArrivals', {
                params: {limit: 10},
            });
            return response.data;
        },

        async searchProducts(searchTerm, cursor = null, limit = 10) {
            const response = await apiClient.get('/products/search', {
                params: {
                    query: searchTerm,
                    cursor,
                    limit,
                },
            });
            return response.data;
        },

        async getProductDetails(id) {
            const response = await apiClient.get(`/products/${id}`);
            return response.data;
        },

    },
    cart: {
        async createCart(items) {
            const response = await apiClient.post('/carts/create', {items}, {
                headers: {needsAuth: true}
            });
            return response.data;
        },

        async getMyCart() {
            const response = await apiClient.get('/carts/me', {
                headers: {needsAuth: true}
            });
            return response.data;
        },
        async handleCartOptions(localCartId, option) {
            console.log(option)
            const response = await apiClient.post('/carts/handleCartOptions', {
                option: option,
                localCartId: localCartId
            }, {
                headers: {needsAuth: true}
            });
            return response.data;
        },

        async updateCart(cartId, items) {
            const response = await apiClient.put(`/carts/${cartId}`, {items: items}, {
                headers: {needsAuth: true}
            });
            return response.data;
        },

        async deleteCart(cartId) {
            const response = await apiClient.delete(`/carts/${cartId}`, {
                headers: {needsAuth: true}
            });
            return response.data;
        },

        async getCartById(cartId) {
            const response = await apiClient.get(`/carts/${cartId}`);
            return response.data;
        },
    },
    auth: {
        async signup(userData) {
            const response = await apiClient.post('/auth/signup', userData);
            return response.data;
        },

        async login(userData) {
            const response = await apiClient.post('/auth/signin', userData);
            return response.data;
        },

        async logout() {
            const response = await apiClient.get('/auth/logout');
            return response.data;
        },

        async refreshToken() {
            const response = await apiClient.post('/auth/webTokenRefresh');
            return response.data;
        }
    },
    user: {
        async fetchUser() {
            const response = await apiClient.get('/users/me', {
                headers: {needsAuth: true}
            });
            return response.data;
        }
    },
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
