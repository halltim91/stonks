import { render, screen, fireEvent } from '@testing-library/react';
import StockPopUp from '../components/stocks/stockPopup';
import { act } from 'react-dom/test-utils';

describe('Stock Popup', () => {
    it('Renders Stock Popup', async () => {
        render(<StockPopUp trigger={true} closeModal={() => {}} children={null} />);
    });

    it('Renders children when trigger is true', async () => {
        await act(async () => {
            render(<StockPopUp trigger={true} closeModal={() => {}}>
                <p>Child Content</p>
            </StockPopUp>);
        });
        expect(screen.getByTestId('stock-popup')).toBeInTheDocument();
        expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('Does not render when trigger is false', async () => {
        await act(async () => {
            render(<StockPopUp trigger={false} closeModal={() => {}}>
                <p>Child Content</p>
            </StockPopUp>);
        });
        expect(screen.queryByTestId('stock-popup')).toBeNull();
        expect(screen.queryByText('Child Content')).toBeNull();
    });

    it('calls closeModal callback when close button is clicked', async () => {
        const closeModalMock = jest.fn();
        await act(async () => {
            render(<StockPopUp trigger={true} closeModal={closeModalMock}>
                <p>Child Content</p>
            </StockPopUp>);
        });
        await act(async () => {
            fireEvent.click(screen.getByText('close'));
          });
        expect(closeModalMock).toHaveBeenCalledWith(false);
    });
});