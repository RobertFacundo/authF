import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterService, LoginService, GitHubService } from "../services/authServices";
import { validateInputs } from "../utils/validateInputs";
import checkEmailExists from "../services/checkEmailService";
import { useAuth as AuthContext } from "../contexts/AuthContext";
import { ResetPassword } from "../services/PasswordService";

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
    const { setIsAuthenticated } = AuthContext()

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

            if (type === 'register') {
                const emailExists = await checkEmailExists(credentials.email)
                if (emailExists) {
                    setError('Email already registered')
                    setLoading(false);
                    return;
                }
            }

            let user = { ...credentials, captchaToken }
            console.log(user, 'consolelog before calling service')

            if (type === 'register') {
                response = await RegisterService(user);
                setSuccess('Successfull register 🎉  Check your email inbox to validate your email...');
            } else if (type === 'login') {
                const loginUser = { email: credentials.email, password: credentials.password }
                setLoading(true)

                response = await LoginService(loginUser);
                localStorage.setItem('authToken', response.access_token)
                setSuccess('Successfull login 🎉 Redirecting to dashboard');
                setIsAuthenticated(true)
                setTimeout(() => navigate('/'), 150);
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
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`
    }

    const handleGitHubCallBack = async (code) => {
        setLoading(true);
        try {
            const token = await GitHubService(code);
            if (token) {
                localStorage.setItem('authToken', token);
                console.log(token, 'token guardado en localstorage')
                setSuccess('GitHub login successfull 🎉 Redirecting to dashboard');
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

    const handleLogOut = () => {
        const authToken = localStorage.getItem('authToken');
        console.log(authToken, 'log logout')

        if (authToken) {
            console.log('removingtoken', authToken)
            localStorage.removeItem(authToken)
        } else {
            console.log('Notokenfound')
        }

        setIsAuthenticated(false);

        console.log('redirecting')
        navigate('/')
    };

    const resetPassword = async (token, newPassword) => {
        try {
            const response = await ResetPassword(token, newPassword);
            console.log(response, 'response del hook resetPassword')
            return response.message;
        } catch (error) {
            console.error(error)
            throw new Error(error);
        };
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
        handleGitHubLogin,
        handleLogOut,
        resetPassword
    }
};

export default useAuth;

