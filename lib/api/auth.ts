import axiosInstance from "./config";
import { getToken, saveToken } from '@/lib/token/store';

const extractRefreshToken = async (cookies: string[]) => {
    const refreshTokenCookie = cookies.find(cookie => cookie.startsWith('refreshToken='));
    if (refreshTokenCookie) {
        let refreshToken = refreshTokenCookie.split(';')[0].split('=')[1];
        await saveToken('refreshToken', refreshToken);
    }
    return null;
}

export const signUp = async (name: string, email: string, password: string) => {
    try {
        const body = { name, email, password }
        const response = await axiosInstance.post('/auth/register', body, {
            headers: {Authorization: 'none'}
        });
        const { accessToken } = response.data;
        const cookies = response.headers['set-cookie'];
        if (cookies && Array.isArray(cookies)) {
            await extractRefreshToken(cookies);
        }
        return { accessToken };
    } catch (error: any) {
        console.error('Error al registrar el usuario', error);
        
        if (error.response) {
            console.log('Error status:', error.response.status);
            console.log('Error data:', error.response.data);

            console.log("ERROR ", error.response)
            switch (error.response.status) {
                case 500:
                    throw new Error(`Error en creación de usuario: ${error.response.data.message || 'No se proporcionaron detalles adicionales'}`);
            }
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor. Por favor, verifique su conexión a internet.');
        } else {
            throw new Error(`Error al realizar la solicitud: ${error.message}`);
        }
        throw error;
    }
};

export const signin = async (email: string, password: string) => {
    try {
        const body = { email, password }
        const response = await axiosInstance.post('/auth/login', body, {
            headers: {Authorization: 'none'}
        });
        const { accessToken } = response.data;
        const cookies = response.headers['set-cookie'];
        if (cookies && Array.isArray(cookies)) {
            await extractRefreshToken(cookies);
        }
        return { accessToken };
    } catch (error: any) {
        console.error('Login error:', error);

        if (error.response) {
            console.log('Error status:', error.response.status);
            console.log('Error data:', error.response.data);

            switch (error.response.status) {
                case 400:
                    throw new Error(`Credenciales inválidas`);
                case 401:
                    throw new Error(`Verifique sus credenciales`);
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

export const refreshAccessToken = async () => {
    try {
        const refreshToken = await getToken('refreshToken');
        const response = await axiosInstance.post(`/auth/refresh`, {}, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        });
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        await saveToken('accessToken', accessToken);
        if (newRefreshToken) {
            await saveToken('refreshToken', newRefreshToken);
        }
        return accessToken;
    } catch (error) {
        throw error;
    }
};

export const getUserInfo = async (id: string, token: string) => {
    try {
        const response = await axiosInstance.get(`/user/find-by-id/${id}`,
            { headers: { 'Authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el usuario');
        throw error;
    }
};

export const updatePassword = async (userId: string, currentPassword: string, newPassword: string, confirmPassword: string, token: string) => {
    console.log("UPDATE PASSWORD", userId, currentPassword, newPassword, confirmPassword, token)
    try {
        const body = { userId, currentPassword, newPassword, confirmNewPassword: confirmPassword }
        const response = await axiosInstance.patch(`/auth/change-password`,
            body, 
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la contraseña');
        throw error;
    }
}

export const forgotPassword = async (email: string) => {
    try {
        const response = await axiosInstance.post(`/auth/forgot-password`, { email }, {
            headers: {
                'Authorization': 'none'
            }
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            switch (error.response.status) {
                case 502:
                    throw new Error('El servidor no está disponible en este momento. Por favor, inténtelo más tarde.');
                case 404:
                    throw new Error('El correo electrónico no está registrado.');
                case 400:
                    throw new Error(error.response.data.message || 'Datos inválidos.');
                default:
                    throw new Error(`Error al enviar el correo: ${error.response.data.message || 'Error del servidor'}`);
            }
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor. Verifique su conexión a internet.');
        } else {
            throw new Error(`Error en la solicitud: ${error.message}`);
        }
    }
}

export const resetPassword = async (code: string, newPassword: string) => {
    try {
        const body = { 
            token: code, 
            password:newPassword 
        }
        const response = await axiosInstance.post(`/auth/reset-password`, body);
        return response.data;
    } catch (error) {
        console.error('Error al restablecer la contraseña');
        throw error;
    }
}

export const logout = async (token: string) => {
    try {
        const response = await axiosInstance.post('/auth/logout', {}, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error al cerrar la sesión');
        throw error;
    }
}
