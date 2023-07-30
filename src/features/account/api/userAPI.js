// src/api/user.js
export const userAPI = (apiClient) => ({
    async fetchUser() {
        const response = await apiClient.get('/users/me', {
            headers: {needsAuth: true}
        });
        return response.data;
    },
    async updateUser(userData) {
        const response = await apiClient.put('/users/me', userData, {
            headers: {needsAuth: true}
        });
        return response.data;
    },
    async changePassword(data) {
        const response = await apiClient.put('/users/me/password', data, {
            headers: {needsAuth: true}
        });
        return response.data;
    },
    async deleteUser() {
        const response = await apiClient.delete('/users/me', {
            headers: {needsAuth: true}
        });
        return response.data;
    }
});
