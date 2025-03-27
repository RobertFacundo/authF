import axios from "axios";

export const validationService = async (verificationToken) => {
    try {
        console.log('Verifying token froms service:', verificationToken);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verification/${verificationToken}`)
        console.log(response, 'response de service')
        return response.data
    } catch (error) {
        console.log(error)
        throw error;
    }
}