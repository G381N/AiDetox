import axios from 'axios';

// Create a configured instance of axios
const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Shared base URL for all requests
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000 // 10 seconds timeout
});

// Optional: Add interceptors here if needed in the future
// apiClient.interceptors.response.use(...)

export default apiClient;
