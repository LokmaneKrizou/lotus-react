export const orderManagementAPI = (apiClient) => ({
    async getAllOrders(cursor = null, limit = 5) {
        const response = await apiClient.get('/orders', {
            params: {
                cursor,
                limit,
            },
        }, {
            headers: {needsAuth: true}
        });
        return response.data;
    },
    async cancelOrder(orderId) {
        const response = await apiClient.get(`/orders/cancel/${orderId}`, {
            headers: {needsAuth: true}
        });
        return response.data;
    },
});
