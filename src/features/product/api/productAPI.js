export const productsAPI = (apiClient) => ({
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

});
