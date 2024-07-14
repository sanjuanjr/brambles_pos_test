import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CashierCard from '../components/CashierCard';
import { useSales, SalesProvider } from '../context/SalesContext';
import { Cashier } from '../interfaces/Cashier';

jest.mock('../context/SalesContext', () => ({
    useSales: jest.fn(),
    SalesProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('../helpers/cashierCardStyleHelper', () => ({
    getCardStyles: jest.fn(() => ({})),
    getBoxColor: jest.fn(() => 'primary.main'),
}));

const renderWithProviders = (ui: React.ReactElement) => {
    const theme = createTheme();
    return render(
        <SalesProvider>
            <ThemeProvider theme={theme}>
                {ui}
            </ThemeProvider>
        </SalesProvider>
    );
};

describe('CashierCard Component', () => {
    const mockCashier: Cashier = {
        id: 1,
        name: 'John Doe',
    };

    const mockHandleItemClick = jest.fn();
    const mockGetSelectedCashierId = jest.fn();

    beforeEach(() => {
        (useSales as jest.Mock).mockReturnValue({
            getSelectedCashierId: mockGetSelectedCashierId,
        });
        mockGetSelectedCashierId.mockReturnValue(1);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders cashier card with name and click prompt', () => {
        renderWithProviders(<CashierCard cashier={mockCashier} handleItemClick={mockHandleItemClick} />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Click here to select John Doe')).toBeInTheDocument();
    });

    test('calls handleItemClick when card is clicked', () => {
        renderWithProviders(<CashierCard cashier={mockCashier} handleItemClick={mockHandleItemClick} />);

        const card = screen.getByTestId('cashier-1-card');
        fireEvent.click(card);

        expect(mockHandleItemClick).toHaveBeenCalledWith(mockCashier);
    });
});
