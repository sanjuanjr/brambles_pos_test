import React from 'react';
import { render, screen } from '@testing-library/react';
import { SalesProvider, useSales } from './SalesContext';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Sale } from '../interfaces/Sale';
import { Cashier } from '../interfaces/Cashier';

// Mock data
const mockSale: Sale = {
    cashierId: 1,
    saleAmount: 100
};

const mockCashier: Cashier = {
    id: 1,
    name: 'Test Cashier'
};

// Test Component
const TestComponent = () => {
    const { state, dispatch, setCashier, resetCashier, getSelectedCashierId } = useSales();
    return (
        <div>
            <span data-testid="sales-length">{state.sales.length}</span>
            <button onClick={() => dispatch({ type: 'ADD_SALE', payload: mockSale })}>Add Sale</button>
            <button onClick={() => dispatch({ type: 'RESET_SALES' })}>Reset Sales</button>
            <span data-testid="cashier-id">{getSelectedCashierId()}</span>
            <button onClick={() => setCashier(mockCashier)}>Set Cashier</button>
            <button onClick={resetCashier}>Reset Cashier</button>
        </div>
    );
};

describe('SalesContext', () => {
    it('provides initial sales value', () => {
        render(
            <SalesProvider>
                <TestComponent />
            </SalesProvider>
        );
        expect(screen.getByTestId('sales-length')).toHaveTextContent('5'); // Initial sales length based on provided data
    });

    it('adds a sale', async () => {
        render(
            <SalesProvider>
                <TestComponent />
            </SalesProvider>
        );
        userEvent.click(screen.getByText('Add Sale'));
        expect(screen.getByTestId('sales-length')).toHaveTextContent('6');
    });

    it('resets sales', async () => {
        render(
            <SalesProvider>
                <TestComponent />
            </SalesProvider>
        );
        userEvent.click(screen.getByText('Reset Sales'));
        expect(screen.getByTestId('sales-length')).toHaveTextContent('0');
    });

    it('sets and resets cashier', async () => {
        render(
            <SalesProvider>
                <TestComponent />
            </SalesProvider>
        );
        userEvent.click(screen.getByText('Set Cashier'));
        expect(screen.getByTestId('cashier-id')).toHaveTextContent('1');
        userEvent.click(screen.getByText('Reset Cashier'));
        expect(screen.getByTestId('cashier-id')).toHaveTextContent('0');
    });
});
