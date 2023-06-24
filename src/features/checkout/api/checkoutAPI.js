export const checkoutAPI = (apiClient) => ({
    async createOrder(order) {
        const response = await apiClient.post('/orders/create', order, {
            headers: {needsAuth: true}
        });
        return response.data;
    },
});
