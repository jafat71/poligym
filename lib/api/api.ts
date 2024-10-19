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

export const signin = async (email: string, password: string) => {
    try {
        const body = { email, password }
        const response = await axiosInstance.post('/auth/login', body);
        return response.data;
    } catch (error: any) {
        console.log(error.response.status)
        switch (error.response.status) {
            case 400:
                throw new Error('Credenciales inválidas');
            default:
                throw new Error('Error al ingresar a la plataforma');
        }
    }
};

export const verifyToken = async (token: string) => {
    try {
        const response = await axiosInstance.get('/auth/verify', 
            { headers: { 'Authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error('Error al verificar el token');
        throw error;
    }
};

export const getUserInfo = async (id: string, token: string) => {
    console.log(id)
    try {
        const response = await axiosInstance.get(`/user/find-by-id/${id}`, 
            { headers: { 'Authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el usuario');   
        throw error;
    }
};

