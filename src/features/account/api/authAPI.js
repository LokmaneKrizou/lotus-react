export const authAPI = (apiClient) => ({
    async signup(userData) {
        const response = await apiClient.post('/auth/signup', userData);
        return response.data;
    },

    async login(userData) {
        const response = await apiClient.post('/auth/signin', userData);
        return response.data;
    },

    async logout() {
        const response = await apiClient.get('/auth/logout', {
            headers: {needsAuth: true}
        });
        return response.data;
    },

    async refreshToken() {
        const response = await apiClient.post('/auth/webTokenRefresh');
        return response.data;
    }
});
