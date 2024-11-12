import axios from 'axios';
import { getToken, saveToken } from "../token/store";

const getBaseUrl = () => {
    if (__DEV__) {
        return process.env.EXPO_PUBLIC_DEV_API_BASE_URL + '/api';
    } else {
        return process.env.EXPO_PUBLIC_PROD_API_BASE_URL + '/api';
    }
};

const API_BASE_URL = getBaseUrl()
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

//Instancia para refrescar access token para evitar bucle en operación fallida
const axiosRefreshInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = await getToken("refreshToken");
            if (refreshToken) {
                try {
                    let accessToken = await getToken("accessToken")
                    const response = await axiosRefreshInstance.post(`/auth/refresh`, {}, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    console.log("Access token refreshed");
                    const newAccessToken = response.data.accessToken;
                    await saveToken("accessToken", newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    console.log("refresed finished");
                    return axiosInstance(originalRequest);
                } catch (error) {
                    //SetRefreshToken(null)
                    console.log("Refresh access token failed");
                    console.log(error);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;