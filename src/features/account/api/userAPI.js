// src/api/user.js
export const userAPI = (apiClient) => ({
    async fetchUser() {
        const response = await apiClient.get('/users/me', {
            headers: {needsAuth: true}
        });
        return response.data;
    }
});
