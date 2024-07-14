import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SalesProvider } from '../context/SalesContext';
import SelectCashier from '../pages/SelectCashier';
import cashiers from '../data/cashier_sample.json';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        ...originalModule,
        useNavigate: () => mockNavigate,
    };
});

const renderWithProviders = (ui: React.ReactElement) => {
    const theme = createTheme();
    return render(
        <SalesProvider>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    {ui}
                </BrowserRouter>
            </ThemeProvider>
        </SalesProvider>
    );
};

describe('SelectCashier Page', () => {
    test('renders header with title "Select Cashier"', () => {
        renderWithProviders(<SelectCashier />);
        const header = screen.getByRole('heading', { name: /Select Cashier/i });
        expect(header).toBeInTheDocument();
    });

    test('renders all cashier cards', () => {
        renderWithProviders(<SelectCashier />);
        cashiers.forEach((cashier) => {
            const cashierCard = screen.getByTestId(`cashier-${cashier.id}-card`);
            expect(cashierCard).toBeInTheDocument();
        });
    });

    test('calls handleItemClick and navigates to dashboard on cashier card click', async () => {
        renderWithProviders(<SelectCashier />);
        const cashier = cashiers[0];
        const cashierCard = screen.getByTestId(`cashier-${cashier.id}-card`);

        fireEvent.click(cashierCard);

        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });

    test('cashier card displays the correct name and prompt', () => {
        renderWithProviders(<SelectCashier />);
        cashiers.forEach((cashier) => {
            const nameElement = screen.getByText(cashier.name);
            const promptElement = screen.getByText(`Click here to select ${cashier.name}`);
            expect(nameElement).toBeInTheDocument();
            expect(promptElement).toBeInTheDocument();
        });
    });
});
