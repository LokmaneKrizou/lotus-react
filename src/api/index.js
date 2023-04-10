// src/index.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

const api = {
    products: {
        async getCategories() {
            const response = await apiClient.get('/categories');
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

    }
    // ... add other API calls as needed
};

export default api;
