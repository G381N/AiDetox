import apiClient from './client';

export default {
    /**
     * Logs the user in
     * @param {Object} credentials - { email, password }
     */
    login(credentials) {
        return apiClient.post('/login/', credentials);
    },

    /**
     * Registers a new user
     * @param {Object} userData - { email, password }
     */
    signup(userData) {
        return apiClient.post('/signup/', userData);
    }
};
