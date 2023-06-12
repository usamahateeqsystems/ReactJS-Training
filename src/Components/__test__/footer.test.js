import { render } from '@testing-library/react';
import Footer from '../footer';

describe("Footer has grey background", () => {
    it('should render same text passed into title prop', () => {
        const {container}  = render(
            <Footer />
        );
        expect(container.firstChild).toHaveStyle({backgroundColor: 'rgba(0, 0, 0, 0.05)'});
    });
})
