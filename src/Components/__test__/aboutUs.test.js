import { render, screen } from '@testing-library/react';
import AboutUs from '../aboutUs';

describe("About Us works fine", () => {
    it('should render same text passed into title prop', () => {
        render(
            <AboutUs />
        );
        const h1Element = screen.getByText(/About Us/i);
        expect(h1Element).toBeInTheDocument();
    });
})
