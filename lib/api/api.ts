import axiosInstance from "./config";

export const signUp = async (name: string, email: string, password: string) => {
    try {
        const body = { name, email, password }
        const response = await axiosInstance.post('/auth/register', body);
        return response.data;
    } catch (error) {
        console.error('Error al registrar el usuario:');        
        throw error;
    }
};

export const verifyToken = async (token: string) => {
    try {
        const response = await axiosInstance.get('/auth/verify', { headers: { 'Authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error('Error al verificar el token');
        throw error;
    }
};

export const getUserInfo = async (id: string) => {
    console.log(id)
    try {
        const response = await axiosInstance.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el usuario');
        throw error;
    }
};

