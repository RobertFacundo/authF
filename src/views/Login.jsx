import React from "react";
import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../contexts/AuthContext";
import ConditionalCard from "../components/card/ConditionalCard";

const Login = () => {
    const {isAuthenticated } = useAuth()
    return (
        <>
            {isAuthenticated ? <ConditionalCard /> : <AuthForm type='login' />}
        </>
    )
}

export default Login;