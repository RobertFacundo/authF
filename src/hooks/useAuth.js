import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterService, LoginService, GitHubService } from "../services/authServices";
import { validateInputs } from "../utils/validateInputs";
import checkEmailExists from "../services/checkEmailService";

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
    const [loading, setLoading] = useState(false)
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

        if (type === 'register' && !captchaToken) {
            setError('Please, validate captcha to continue');
            return;
        }
        const validationError = validateInputs(credentials.email, credentials.password);
        if (validationError) {
            setError(validationError);
            return;
        }

        setSuccess(null);
        setLoading(true)
        setError(null)

        try {
            let response;

            const emailExists = await checkEmailExists(credentials.email)
            if (emailExists) {
                setError('Email already registered')
                setLoading(false);
                return;
            }

            const user = { ...credentials, captchaToken }
            console.log(user, 'consolelog before calling service')

            if (type === 'register') {
                response = await RegisterService(user);
                setSuccess('Successfull register 🎉  Check your email inbox to validate your email...');
            } else if (type === 'login') {
                setLoading(true)
                response = await LoginService({ email: credentials.email, password: credentials.password });
                setSuccess('Successfull login 🎉 Redirecting to dashboard');

                setTimeout(() => navigate('/'), 2000);
            }

            setError(null);
        } catch (error) {
            setError('Error al procesar la solicitud. Inténtalo de nuevo');
            console.error('Error en autenticación:', error)
        } finally {
            setLoading(false)
        }
    };

    const handleGitHubLogin = () => {
        console.log('Paso numero 1')
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`
    }

    const handleGitHubCallBack = async (code) => {
        setLoading(true);
        try {
            console.log('paso numero 5 llamando a github service =>')
            const token = await GitHubService(code);
            console.log(token, 'console.LOG !!!!!!!')
            if (token) {
                console.log(' PASO NUMERO 6 =>GitHub login successful. Token received:', token);
                localStorage.setItem('authToken', token);
                setSuccess('GitHub login successfull 🎉 Redirecting to dashboard');
                console.log('paso 7 seteado success')
                return { success: true }
            } else {
                setError('GitHub login failed')
                return { success: false }
            }
        } catch (error) {
            setError('Error during GitHub authentication');
            console.error(error)
            return { success: false }
        } finally {
            setLoading(false)
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
        loading,
        handleGitHubCallBack,
        handleGitHubLogin
    }
};

export default useAuth;

