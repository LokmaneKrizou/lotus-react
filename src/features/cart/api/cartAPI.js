export const cartAPI = (apiClient) => ({
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
});
