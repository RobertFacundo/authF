import axios from "axios";

export const ResetPassword = async (token, newPassword) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
            token,
            newPassword
        });
        console.log(response, 'response del service resetpassword')
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error(error);
    };
};

export const ForgotPasswordService = async (email) => {
    try {
        console.log('llamando a service')
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, { email });
        console.log(response, 'log del service ForgotPassword 1!')
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }
}