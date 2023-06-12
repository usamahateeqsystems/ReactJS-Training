import { render, screen } from '@testing-library/react';
import Home from '../home';

describe("Home Works fine", () => {
    it('should render same text passed into title prop', () => {
        render(
            <Home />
        );
        const h1Element = screen.getByText(/Welcome to CryptoExchange!/i);
        expect(h1Element).toBeInTheDocument();
    });
})
