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
        console.error('Login error:', error);

        if (error.response) {
            console.log('Error status:', error.response.status);
            console.log('Error data:', error.response.data);

            switch (error.response.status) {
                case 400:
                    throw new Error(`Credenciales inválidas: ${error.response.data.message || 'No se proporcionaron detalles adicionales'}`);
                case 401:
                    throw new Error(`No autorizado: ${error.response.data.message || 'Verifique sus credenciales'}`);
                case 404:
                    throw new Error('Usuario no encontrado');
                case 500:
                    throw new Error(`Error al ingresar a la plataforma: ${error.response.data.message || 'No se proporcionaron detalles adicionales'}`);
            }
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor. Por favor, verifique su conexión a internet.');
        } else {
            throw new Error(`Error al realizar la solicitud: ${error.message}`);
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

