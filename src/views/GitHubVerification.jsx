import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth as AuthContext } from '../contexts/AuthContext';
import { Container, SuccessMessage, ErrorMessage } from "../components/auth/AuthFormStyles";
import LoadingSpinner from '../components/common/Loader';
import useAuth from "../hooks/useAuth";

const GitHubVerification = ({ type }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState(null);
    const { setIsAuthenticated } = AuthContext();
    const { handleGitHubCallBack } = useAuth(type)

    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    console.log('Received code:', code);

    useEffect(() => {
        if (!code) {
            console.error('No code parameter found in the URL');
            return;
        }
        const verifyGitHub = async () => {
            try {
                setVerificationStatus('loading')
                const response = await handleGitHubCallBack(code);
                console.log(response, 'response efffectttt!!!!')
                if (response.success) {
                    setVerificationStatus('success');
                    setIsAuthenticated(true)
                    setTimeout(() => navigate('/'), 2000); // Redirigir después de 2 segundos
                } else {
                    setVerificationStatus('failure');
                }
            } catch (error) {
                setVerificationStatus('failure');
                console.error(error)
            }
        };

        verifyGitHub();
    }, [code, navigate, setIsAuthenticated]);

    return (
        <Container>
            {verificationStatus === 'loading' && <LoadingSpinner />}
            {verificationStatus === 'success' && <SuccessMessage>Git Hub Login Successfull. Redirecting... <LoadingSpinner /></SuccessMessage>}
            {verificationStatus === 'failure' && <ErrorMessage>GithubLogin failed. Please Try again later.</ErrorMessage>}
        </Container>
    );
};

export default GitHubVerification;