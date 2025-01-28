// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8081', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});



export default apiClient;
