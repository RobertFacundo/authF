import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { useAuth as AuthContext } from '../contexts/AuthContext';
import useAuth from "../hooks/useAuth";

const Card = styled.div`
    background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco con transparencia */
    border-radius: 8px;
    padding: 2rem;
    margin: 2rem auto;
    max-width: 800px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Paragraph = styled.p`
    margin-bottom: 1rem;
    line-height: 1.6; 
    color: #333;
    font-weight: 450;
    letter-spacing: 0.5px;
    font-style: italic;
`;

const Highlight = styled.strong`
    color: #d35400;
    font-weight: 600;
    letter-spacing: 1px;
`;

const CheckIcon = styled(FaCheckCircle)`
  color: #28a745; 
  font-size: 2rem;
  opacity: ${(props) => (props.active ? 1 : 0.2)}; 
  transition: opacity 0.3s ease;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
`;

const AuthStatus = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
`;

const StatusText = styled.p`
    font-size: 1.2rem;
    color: #555;
    font-style: italic;
    letter-spacing: 0.5px;
    margin-top: 0.5rem; 
`;


const Dashboard = () => {
    const { isAuthenticated } = AuthContext();
    const location = useLocation();
    const navigate = useNavigate();
    const { setIsAuthenticated } = AuthContext();
    const { handleGitHubCallBack } = useAuth()

    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    console.log('Received code:', code);

    useEffect(() => {
        if (!code) {
            console.log('No code parameter found in the URL');
            return;
        }
        const verifyGitHub = async () => {
            try {
                const response = await handleGitHubCallBack(code);
                if (response.success) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                }
            } catch (error) {
                setIsAuthenticated(false)
                console.error(error)
            }
        };

        verifyGitHub();
    }, [code, navigate, setIsAuthenticated]);

    return (
        <>
            <AuthStatus>
                <CheckIcon active={isAuthenticated} />
                <StatusText>{isAuthenticated ? 'User authenticated' : 'User not yet authenticated'}</StatusText>
            </AuthStatus>
            <Card>
                <Paragraph>
                    This project offers a complete and secure authentication flow where users can register and log in to access their accounts.
                </Paragraph>
                <Paragraph>
                    When a user registers, all fields are validated to ensure proper data entry. Once the registration is successful, a confirmation email is sent automatically.
                </Paragraph>
                <Paragraph>
                    <Highlight>Please note:</Highlight> When registering, be sure to use a valid, non-fictitious email address so you can complete the verification process.
                </Paragraph>
                <Paragraph>
                    After clicking the confirmation link in the email, the user is redirected back to the dashboard, where a green checkmark indicates successful email verification.
                </Paragraph>
                <Paragraph>
                    Additionally, users can change their password at any time. In case of a forgotten password, the system provides a password reset functionality by sending a secure code to the registered email.
                </Paragraph>
                <Paragraph>
                    We invite users to explore these features and experience a seamless, professional authentication process.
                </Paragraph>
            </Card>
        </>
    )
}

export default Dashboard;