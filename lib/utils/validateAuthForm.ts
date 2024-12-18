import { User } from "@/types/interfaces/entities/user";

const emailRegex = /^[a-zA-Z0-9._%+-ñÑ]+@epn\.edu\.ec$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/;

export const validateSignup = (email: string, password: string) => {
    const errors: string[] = [];

    if (!emailRegex.test(email)) {
        errors.push("El email debe ser un correo institucional válido (@epn.edu.ec)");
    }

    if (!passwordRegex.test(password)) {
        errors.push("La contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales");
    }
    return {
        errors
    }
}

export const validateSignIn = (email: string, password: string) => {
    const errors: string[] = [];

    if (!emailRegex.test(email)) {
        errors.push("El email debe ser un correo institucional válido (@epn.edu.ec)");
    }

    if (!(password)) {
        errors.push("Por favor ingrese su contraseña");
    }

    return {
        errors
    }
}

export const validateUpdatePassword = (currentPassword: string, newPassword: string, confirmPassword: string) => {
    const errors: string[] = [];

    if (!passwordRegex.test(newPassword)) {
        errors.push("La nueva contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales");
    }

    if (newPassword !== confirmPassword) {
        errors.push("Las contraseñas no coinciden");
    }

    if (!currentPassword) {
        errors.push("Por favor ingrese su contraseña actual");
    }

    if (currentPassword === newPassword) {
        errors.push("La nueva contraseña no puede ser igual a la contraseña actual");
    }

    return {
        errors
    }
}

export const validateForgotPassword = (email: string) => {
    const errors: string[] = [];

    if (!emailRegex.test(email)) {
        errors.push("El email debe ser un correo institucional válido (@epn.edu.ec)");
    }

    return {
        errors
    }
}

export const validateResetPassword = (code: string, newPassword: string) => {

    const errors: string[] = [];

    if (!code) {
        errors.push("Por favor ingrese su codigo de recuperación");
    }

    if (!passwordRegex.test(newPassword)) {
        errors.push("La nueva contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales");
    }

    return {
        errors
    }
}

export const validateZInput = (text: string) => {
    return /^[0-9]+$/.test(text); 
};

export const validateFloatInput = (text: string) => {
    return /^[0-9]*[.,]?[0-9]*$/.test(text);

};
export const validateUserInfo = (userInfo: Partial<User>) => {
    const errors: string[] = [];

    if (!userInfo.name) {
        errors.push("El nombre no puede estar vacío");
    }

    if (userInfo.name && userInfo.name.length < 4) {
        errors.push("El nombre debe tener al menos 4 caracteres");
    }

    if (!userInfo.age) {
        errors.push("La edad no puede estar vacía");
    }

    if (userInfo.age && userInfo.age < 18) {
        errors.push("Debes ser mayor de 18 años para utilizar esta aplicación");
    }

    if (userInfo.age && userInfo.age > 100) {
        errors.push("La edad no puede ser mayor a 100 años");
    }

    return {
        errors
    }
}

export const validateNumericInput = (weight: number, height: number) => {
    const errors: string[] = [];

    if (!weight || !height) {
        errors.push("Por favor ingrese todos los campos");
    }

    if (!validateFloatInput(weight.toString())) {
        errors.push("El peso debe ser un número decimal válido");
    }

    if (!validateFloatInput(height.toString())) {
        errors.push("La altura debe ser un número decimal válido");
    }

    if (weight > 300) {
        errors.push("El peso no puede ser mayor a 300 kg");
    }

    if (height > 250) {
        errors.push("La altura no puede ser mayor a 250 cm");
    }

    if (weight < 40) {
        errors.push("El peso no puede ser menor a 40 kg");
    }

    if (height < 140) {
        errors.push("La altura no puede ser menor a 140 cm");
    }

    return {
        errors
    }
}
