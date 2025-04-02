import React from "react";
import AuthForm from "../components/auth/AuthForm";
import { useAuth } from '../contexts/AuthContext'
import ConditionalCard from "../components/card/ConditionalCard";

const Register = () => {
    const { isAuthenticated } = useAuth();
    return (
        <>
            {isAuthenticated ? <ConditionalCard /> : <AuthForm type='register' />}
        </>
    )
}

export default Register;