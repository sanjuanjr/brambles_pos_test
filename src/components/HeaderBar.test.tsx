import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import { useSales, SalesProvider } from '../context/SalesContext';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        ...originalModule,
        useNavigate: jest.fn(),
    };
});

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

describe('HeaderBar Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        (useSales as jest.Mock).mockReturnValue({
            state: {
                selectedCashier: {
                    name: 'John Doe',
                },
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the title', () => {
        renderWithProviders(<HeaderBar showBackButton={false} title="Test Title" showCashierName={false} />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    test('renders the back button and handles click', () => {
        renderWithProviders(<HeaderBar showBackButton={true} title="Test Title" showCashierName={false} />);
        const backButton = screen.getByRole('button', { name: /Back/i });
        expect(backButton).toBeInTheDocument();
        fireEvent.click(backButton);
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    test('does not render the back button when showBackButton is false', () => {
        renderWithProviders(<HeaderBar showBackButton={false} title="Test Title" showCashierName={false} />);
        expect(screen.queryByRole('button', { name: /Back/i })).not.toBeInTheDocument();
    });

    test('renders the cashier name when showCashierName is true and selectedCashier is present', () => {
        renderWithProviders(<HeaderBar showBackButton={false} title="Test Title" showCashierName={true} />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    test('does not render the cashier name when showCashierName is false', () => {
        renderWithProviders(<HeaderBar showBackButton={false} title="Test Title" showCashierName={false} />);
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    test('does not render the cashier name when selectedCashier is not present', () => {
        (useSales as jest.Mock).mockReturnValue({
            state: {
                selectedCashier: null,
            },
        });
        renderWithProviders(<HeaderBar showBackButton={false} title="Test Title" showCashierName={true} />);
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
});
