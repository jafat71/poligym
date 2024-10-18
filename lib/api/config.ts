import axios from 'axios';

const getBaseUrl = () => {
    if (__DEV__) {
        return  process.env.EXPO_PUBLIC_DEV_API_BASE_URL + '/api';
    } else {
        return 'https://production-api.com/api';
    }
};

const API_BASE_URL = getBaseUrl()
console.log({API_BASE_URL})
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;