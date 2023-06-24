// src/api/order.js
export const orderAPI = (apiClient) => ({
    async getOrders() {
        const response = await apiClient.get('/orders/me', {
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
