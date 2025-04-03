import React from 'react'
import styled from 'styled-components';
import { Button, Container, ButtonContainer } from '../auth/AuthFormStyles';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


const Header = styled.h1`
    font-size: 1.8rem;
    color: white;
    font-weight: 600;
    margin-bottom: 1rem; /* Separación con el texto */
    text-align: center;
    
`;

const Paragraph = styled.p`
    margin-bottom: 1.5rem;
    line-height: 1.8; 
    color: #555;
    font-weight: 400;
    letter-spacing: 0.5px;
    font-style: italic;
    text-align: center;
`;


const ConditionalCard = () => {
    const navigate = useNavigate();
    const { handleLogOut } = useAuth()
    return (
        <Container>
            <Header>User already authenticated</Header>
            <Paragraph>You can now proceed to change your password or log out</Paragraph>
            <ButtonContainer style={{ marginLeft: '2rem' }}>
                <Button onClick={handleLogOut}>Log out</Button>
                <Button onClick={() => navigate('/forgot-password')}>Change Password</Button>
            </ButtonContainer>
        </Container>
    )
}

export default ConditionalCard;