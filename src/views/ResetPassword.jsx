import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { validatePassword } from "../utils/validateInputs";
import {Form, FieldContainer, Input, IconButton, Button, Container} from '../components/auth/AuthFormStyles'

const ResetPassword = () => {
    const { token } = useParams();
    const { resetPassword } = useAuth()
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('')
    const [message, setMessage] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleChange = (e) => {
        const newPassword = e.target.value;
        setNewPassword(newPassword);

        const validationMessage = validatePassword(newPassword);
        setPasswordError(validationMessage === true ? '' : validationMessage)
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordError) return
        try {
            const response = await resetPassword(token, newPassword); // Guardamos la respuesta en una constante
            console.log(response);
            setMessage({ type: 'success', text: 'Password changed Successfully. Redirecting...' });
            setTimeout(() => {
                navigate('/Login')
            }, 3000)
        } catch (error) {
            console.error(error)
            setMessage({ type: 'error', text: error.response?.data?.message || 'Something went wrong' })
        }
    };

    return (
        <Container>
            <h2>Reset your Password</h2>
            <Form onSubmit={handleSubmit}>
                <label htmlFor="password">Password</label>
                <FieldContainer>
                    <Input
                        type={isPasswordVisible ? 'text' : 'password'}
                        name='password'
                        value={newPassword}
                        onChange={handleChange}
                        required
                    />
                    <IconButton type="button" onClick={togglePasswordVisibility} style={{transform: 'translateY(-90%)'}}>
                        <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye}/>
                    </IconButton>
                </FieldContainer>
                {passwordError && <p>{passwordError}</p>}
                <Button type="submit" disabled={passwordError !== ''}>Change Password</Button>
                {message && (
                    <p style={{ color: message.type === 'error' ? 'red' : 'green' }}>
                        {message.text}
                    </p>
                )}
            </Form>
        </Container>
    );
};

export default ResetPassword;