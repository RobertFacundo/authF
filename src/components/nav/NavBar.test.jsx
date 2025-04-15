import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

describe('navbar component test', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        )
    })
    it('it should successfully render the links', () => {
        expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
        expect(screen.getByText(/register/i)).toBeInTheDocument();
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    it('should navigate to the correct route when click a link', ()=>{
        fireEvent.click(screen.getByText(/dashboard/i));
        expect(window.location.pathname).toBe('/')
        fireEvent.click(screen.getByText(/register/i));
        expect(window.location.pathname).toBe('/Register')
        fireEvent.click(screen.getByText(/login/i));
        expect(window.location.pathname).toBe('/Login')
    });
})