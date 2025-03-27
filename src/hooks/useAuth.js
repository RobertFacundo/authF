import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterService, LoginService } from "../services/authServices";
import { validateInputs } from "../utils/validateInputs";

const useAuth = (type) => {
    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        isPasswordVisible: false
    });
    const [captchaToken, setCaptchaToken] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const togglePasswordVisibility = () => {
        setCredentials((prevState) => ({
            ...prevState,
            isPasswordVisible: !prevState.isPasswordVisible
        }));
    };

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateInputs(credentials.email, credentials.password);
        if (validationError) {
            setError(validationError);
            return;
        }

        if (type === 'register' && !captchaToken) {
            setError('Please, validate captcha to continue');
            return;
        }

        setSuccess(null);

        try {
            let response;
            const user = {...credentials, captchaToken}
            console.log(user, 'consolelog before calling service')

            if (type === 'register') {
                response = await RegisterService(user);
                setSuccess('Successfull register 🎉  Check your email inbox to validate your email...');
            } else if (type === 'login') {
                response = await LoginService({ email: credentials.email, password: credentials.password });
                setSuccess('Successfull login 🎉 Redirecting to dashboard');

                setTimeout(() => navigate('/'), 2000);
            }

            setError(null);
        } catch (error) {
            setError('Error al procesar la solicitud. Inténtalo de nuevo');
            console.error('Error en autenticación:', error)
        }
    };

    return {
        credentials,
        handleChange,
        togglePasswordVisibility,
        handleCaptchaChange,
        handleSubmit,
        error,
        success,
    }
};

export default useAuth;

