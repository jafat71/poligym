import axios from 'axios';

const getBaseUrl = () => {
    if (__DEV__) {
        return  process.env.EXPO_PUBLIC_DEV_API_BASE_URL + '/api';
    } else {
        return  process.env.EXPO_PUBLIC_PROD_API_BASE_URL + '/api';
    }
};

const API_BASE_URL = getBaseUrl()
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;