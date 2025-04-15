import { render, screen, fireEvent } from '@testing-library/react';
import ConditionalCard from './ConditionalCard';
import { vi } from 'vitest';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

const mockHandleLogOut = vi.fn();
vi.mock('../../hooks/useAuth', () => {
    return {
        default: () => ({
            handleLogOut: mockHandleLogOut,
        })
    };
});

describe('ConditionalCard component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('it should render the header and paragraph', () => {
        render(<ConditionalCard />);
        expect(screen.getByText(/user already authenticated/i)).toBeInTheDocument();
        expect(screen.getByText(/you can now proceed to change your password/i)).toBeInTheDocument();
    });

    it('it should call handlelogout when clicking log out button', () => {
        render(<ConditionalCard />);
        const logoutButton = screen.getByRole('button', { name: /log out/i });
        fireEvent.click(logoutButton);
        expect(mockHandleLogOut).toHaveBeenCalled();
    });

    it('should navigate to /forgot-password when clicking Change Password button', () => {
        render(<ConditionalCard />);
        const changePasswordButton = screen.getByRole('button', {name: /change password/i});
        fireEvent.click(changePasswordButton);
        expect(mockNavigate).toHaveBeenCalledWith('/forgot-password');
    });
});
