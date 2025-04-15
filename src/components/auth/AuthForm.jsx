import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import LoadingSpinner from "../common/Loader.jsx";
import { Container, Form, FieldContainer, Input, Button, ButtonContainer, IconButton, ErrorMessage, SuccessMessage, CaptchaContainer } from "./AuthFormStyles.js";

const AuthForm = ({ type }) => {
    const isRegister = type === 'register';
    const { handleChange, credentials, togglePasswordVisibility, handleCaptchaChange, handleSubmit, error, success, loading, handleGitHubLogin} = useAuth(type);

    
    return (
        <Container>
            {!loading && !success && (
                <>
                    <h1>{isRegister ? 'Register' : 'Login'}</h1>
                    <Form onSubmit={handleSubmit} data-testid='auth-form'>
                        {isRegister && (
                            <>
                                <FieldContainer>
                                    <label htmlFor="firstName" data-testid="first-name-label">Name:</label>
                                    <Input id='firstName' type='text' name='firstName' value={credentials.firstName} onChange={handleChange} required />
                                </FieldContainer>
                                <FieldContainer>
                                    <label htmlFor="lastName">Last Name</label>
                                    <Input id='lastName' type='text' name='lastName' value={credentials.lastName} onChange={handleChange} required />
                                </FieldContainer>
                            </>
                        )}
                        <FieldContainer>
                            <label htmlFor="email">Email</label>
                            <Input id='email' type='email' name='email' value={credentials.email} onChange={handleChange} required />
                        </FieldContainer>

                        <FieldContainer>
                            <label htmlFor="password">Password</label>
                            <Input id='password' type={credentials.isPasswordVisible ? 'text' : 'password'} name='password' value={credentials.password} onChange={handleChange} required />
                            <IconButton type="button" onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={credentials.isPasswordVisible ? faEyeSlash : faEye} />
                            </IconButton>
                        </FieldContainer>

                        {isRegister && (
                            <CaptchaContainer>
                                <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} theme="dark"  data-testid="recaptcha"/>
                            </CaptchaContainer>
                        )}
                        <ButtonContainer>
                            <Button type='submit'>{isRegister ? 'Register' : 'Log In'}</Button>
                            <Button type="button" onClick={handleGitHubLogin}  data-testid="github-b">
                                <FontAwesomeIcon icon={faGithub} style={{ marginRight: "5px" }} />
                                Sign in with GitHub
                            </Button>
                        </ButtonContainer>
                    </Form>
                </>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
            {loading && <LoadingSpinner />}
        </Container>
    );
};

export default AuthForm;