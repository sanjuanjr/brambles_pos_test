import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { SalesProvider, useSales } from '../context/SalesContext';
import SalesDashboard from '../pages/SalesDashboard';
import HeaderBar from '../components/HeaderBar';
import getCashierById from '../helpers/getCashierById';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        ...originalModule,
        useNavigate: jest.fn(),
    };
});

jest.mock('@mui/x-charts/BarChart', () => ({
    BarChart: () => <div data-testid="BarChart">BarChart</div>,
}));

jest.mock('../components/HeaderBar', () => () => <div>HeaderBar</div>);

jest.mock('../helpers/getCashierById', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('../context/SalesContext', () => ({
    useSales: jest.fn(),
    SalesProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderWithProviders = (ui: React.ReactElement) => {
    const theme = createTheme();

    return render(
        <SalesProvider>
            <ThemeProvider theme={theme}>
                <Router>
                    {ui}
                </Router>
            </ThemeProvider>
        </SalesProvider>
    );
};

describe('SalesDashboard Page', () => {
    const salesData = [
        { cashierId: 1, saleAmount: 100 },
        { cashierId: 2, saleAmount: 200 },
    ];

    beforeEach(() => {
        (getCashierById as jest.Mock).mockImplementation((id: number) => ({
            name: `Cashier ${id}`,
        }));

        const mockUseSales = {
            state: { sales: salesData },
            resetCashier: jest.fn(),
        };

        (useSales as jest.Mock).mockReturnValue(mockUseSales);
    });

    test('renders SalesDashboard with header and chart', () => {
        renderWithProviders(<SalesDashboard />);

        expect(screen.getByText('HeaderBar')).toBeInTheDocument();
        expect(screen.getByTestId('BarChart')).toBeInTheDocument();
    });

    test('renders buttons for switching cashier and adding sale', () => {
        renderWithProviders(<SalesDashboard />);

        expect(screen.getByText('Switch Cashier')).toBeInTheDocument();
        expect(screen.getByText('Add Sale')).toBeInTheDocument();
    });

    test('handles switching cashier', () => {
        const mockNavigate = jest.fn();
        const mockResetCashier = jest.fn();

        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        (useSales as jest.Mock).mockReturnValue({
            state: { sales: salesData },
            resetCashier: mockResetCashier,
        });

        renderWithProviders(<SalesDashboard />);

        const switchButton = screen.getByText('Switch Cashier');
        fireEvent.click(switchButton);

        expect(mockResetCashier).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test('navigates to add sale page on button click', () => {
        const mockNavigate = jest.fn();

        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        renderWithProviders(<SalesDashboard />);

        const addSaleButton = screen.getByText('Add Sale');
        fireEvent.click(addSaleButton);

        expect(mockNavigate).toHaveBeenCalledWith('/add-sale');
    });

    test('renders chart with correct data', () => {
        renderWithProviders(<SalesDashboard />);

        expect(getCashierById).toHaveBeenCalledWith(1);
        expect(getCashierById).toHaveBeenCalledWith(2);
        expect(screen.getByTestId('BarChart')).toBeInTheDocument();
    });
});
