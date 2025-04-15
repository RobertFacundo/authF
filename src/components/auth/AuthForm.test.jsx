import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import AuthForm from './AuthForm';

const handleChange = vi.fn();
const togglePasswordVisibility = vi.fn();
const handleCaptchaChange = vi.fn();
const handleSubmit = vi.fn((e) => e.preventDefault());
const handleGitHubLogin = vi.fn();

vi.mock('../../hooks/useAuth', () => {
    return {
        default: () => ({
            credentials: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                isPasswordVisible: false
            },
            handleChange,
            togglePasswordVisibility,
            handleCaptchaChange,
            handleSubmit,
            handleGitHubLogin,
            error: null,
            loading: false,
            success: ''
        })
    };
});


describe('AuthForm component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('it should render login inputs', () => {
        render(<AuthForm type='login' />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    });

    it('it should render register inputs', () => {
        render(<AuthForm type='register' />)
        expect(screen.getByTestId(/first-name-label/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    it('it should call handleSubmit when sending the form', () => {
        render(<AuthForm type='login' />);
        const form = screen.getByTestId('auth-form');
        fireEvent.submit(form);
        expect(handleSubmit).toHaveBeenCalled();
    });

    it('it should call handlegithublogin when click on github button', () => {
        render(<AuthForm type='login' />);
        const githubB = screen.getByTestId('github-b');
        fireEvent.click(githubB);
        expect(handleGitHubLogin).toHaveBeenCalled();
    });
});