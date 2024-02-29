import axios from 'axios';

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_HOST_API });

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // Replace with your actual key
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
