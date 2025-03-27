export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

export const validatePassword = (password) => {
    const regexLength = password.length >= 8 && password.length <= 20;
    const regexComplexity = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regexLength) {
        return 'Password must be between 8 and 20 characters';
    }
    if (!regexComplexity.test(password)) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }
    return true;
}

export const validateInputs = (email, password) => {
    if (!validateEmail(email)) {
        return 'Email not valid';
    };
    const passwordValidation = validatePassword(password)
    if (passwordValidation !== true) {
        return passwordValidation;
    }
    return null;
};