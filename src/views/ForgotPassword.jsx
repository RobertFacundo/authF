import React, { useState} from "react";
import { ForgotPasswordService } from "../services/PasswordService";
import {Form, Input, Button, Container} from '../components/auth/AuthFormStyles'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            const response = await ForgotPasswordService(email);
            setMessage(response.message)
            setSent(true)
        } catch (error) {
            setMessage('Error sending reset link')
        }finally{
            setLoading(false);
        }
    };

    return (
        <Container>
            <h2>Forgot Password</h2>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    placeholder="Write your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button type="submit" disabled={loading || sent}>{sent ? 'Sent' : loading ? 'Sending...' : 'Send reset Link'}</Button>
            </Form>
            {message && <p>{message}</p>}
        </Container>
    );
};

export default ForgotPassword