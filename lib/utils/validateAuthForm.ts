export const validateSignup = (email: string, password: string, confirmPassword: string) => {
    const errors: string[] = [];
    const emailRegex = /^[a-zA-Z0-9._%+-]+@epn\.edu\.ec$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/;

    if (!emailRegex.test(email)) {
        errors.push("El email debe ser un correo institucional válido (@epn.edu.ec)");
    }

    if (!passwordRegex.test(password)) {
        errors.push("La contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales");
    }

    if (password !== confirmPassword) {
        errors.push("Las contraseñas no coinciden");
    }
    return {
        errors
    }
}

