import { render, screen } from '@testing-library/react';
import LoadingSpinner from './Loader';

describe('loader component', () => {
    it('it should render the spinner with the correct test id', () => {
        render(<LoadingSpinner />);
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();
    });

    it('loader component should have its class', () => {
        render(<LoadingSpinner/>);
        const spinner = screen.getByTestId('spinner');
        expect(spinner).toHaveClass('loader')
    })
})