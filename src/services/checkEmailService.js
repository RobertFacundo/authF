import axios from "axios"

const checkEmailExists = async (email) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/check-user/${email}`)

        return response.data 
    } catch (error) {
        console.error('Email verification error:', error);
        return { exists: false };
    }
}

export default checkEmailExists;