import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import AddSale from '../pages/AddSale';
import { useSales, SalesProvider } from '../context/SalesContext';
import products from '../data/products_sample.json';
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

jest.mock('../components/HeaderBar', () => () => <div>HeaderBar</div>);

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

describe('AddSale Page', () => {
    const mockAddSale = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        (useSales as jest.Mock).mockReturnValue({
            addSale: mockAddSale,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders AddSale page with header and products table', () => {
        renderWithProviders(<AddSale />);

        expect(screen.getByText('HeaderBar')).toBeInTheDocument();
        expect(screen.getByText(/Products/i)).toBeInTheDocument();
        products.forEach((product) => {
            expect(screen.getByText(product.name)).toBeInTheDocument();
            expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
        });
        expect(screen.getByText(/Total Items: 0/i)).toBeInTheDocument();
        expect(screen.getByText(/Total Cost: \$0.00/i)).toBeInTheDocument();
    });

    test('handles quantity change and updates total items and cost', () => {
        renderWithProviders(<AddSale />);

        const firstProduct = products[0];
        const quantityInputs = screen.getAllByLabelText('Quantity');
        const quantityInput = quantityInputs[0] as HTMLInputElement;

        fireEvent.change(quantityInput, { target: { value: '2' } });

        expect(quantityInput.value).toBe('2');
        expect(screen.getByText(/Total Items: 2/i)).toBeInTheDocument();
        expect(screen.getByText(/Total Cost: \$2.02/i)).toBeInTheDocument();

        // Find the table row containing the first product's name, then the cell with the total cost
        const productRow = screen.getByText(firstProduct.name).closest('tr');
        expect(productRow).toBeInTheDocument();
        if (productRow) {
            const totalCostCell = within(productRow).getByText(`$${(firstProduct.price * 2).toFixed(2)}`);
            expect(totalCostCell).toBeInTheDocument();
        }
    });

    test('disables submit button if total cost is 0', () => {
        renderWithProviders(<AddSale />);

        const submitButton = screen.getByText(/Submit Sale/i) as HTMLButtonElement;
        expect(submitButton).toBeDisabled();
    });

    test('submits sale and navigates to dashboard', () => {
        renderWithProviders(<AddSale />);

        const firstProduct = products[0];
        const quantityInputs = screen.getAllByLabelText('Quantity');
        const quantityInput = quantityInputs[0] as HTMLInputElement;

        fireEvent.change(quantityInput, { target: { value: '2' } });

        const submitButton = screen.getByText(/Submit Sale/i);
        fireEvent.click(submitButton);

        expect(mockAddSale).toHaveBeenCalledWith(firstProduct.price * 2);
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
});
