import axios from 'axios';

export const RegisterService = async (user) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, user);
        return response.data
    } catch (error) {
        console.error('Error en RegisterService:', error.response || error.message);
        throw error;
    };
};

export const LoginService = async (user) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, user);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    };
};

export const GitHubService = async (code) => {
    const url = `${import.meta.env.VITE_API_URL}/auth/github/callback?code=${code}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error during github authentication', error.response || error.message);
        throw error;
    }
};