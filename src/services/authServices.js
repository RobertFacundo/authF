import axios from 'axios';

export const RegisterService = async (user) => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, user);
        return response.data
    }catch(error){
        console.log(error)
        throw error;
    };
};

export const LoginService = async (user) =>{
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, user);
        return response.data;
    }catch(error){
        console.log(error);
        throw error;
    };
};