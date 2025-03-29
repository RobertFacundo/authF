import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { validationService } from "../services/emailValidationService";
import { useAuth } from "../contexts/AuthContext";
import { Container, SuccessMessage, ErrorMessage } from "../components/auth/AuthFormStyles";
import LoadingSpinner from "../components/common/Loader";


const VerifyEmail = () => {
    const { verificationToken } = useParams();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState(null);
    const { setIsAuthenticated } = useAuth()

    console.log('Verification token:', verificationToken); //

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                console.log('Sending verification token to validation service:', verificationToken);
                const response = await validationService(verificationToken);

                console.log('response', response)

                if (response.success) {
                    setVerificationStatus('success');
                    setIsAuthenticated(true)
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else {
                    console.error('Verification failed:', response);
                    setVerificationStatus('failure')
                }
            } catch (error) {
                console.error('Error verifying email:', error);
                setVerificationStatus('failure')
            }
        };
        verifyEmail();
    }, [verificationToken, navigate, setIsAuthenticated])

    return (

        <Container>
            {verificationStatus === 'success' && <SuccessMessage>Email verified successfully. Redirecting... <br /> <LoadingSpinner /></SuccessMessage>}
            {verificationStatus === 'failure' && <ErrorMessage>Verification failed. Please try again later.</ErrorMessage>}
        </Container>
    )
};

export default VerifyEmail;