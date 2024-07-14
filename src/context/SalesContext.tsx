import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import sampleSales from '../data/sales_sample.json';
import { Sale } from '../interfaces/Sale';
import { Cashier } from '../interfaces/Cashier';


// Define the shape of the sales state
interface SalesState {
    sales: Sale[];
    selectedCashier: Cashier | null
}

// Define the types of actions
type SalesAction =
    | { type: 'ADD_SALE'; payload: Sale }
    | { type: 'RESET_SALES' }
    | { type: 'SET_CASHIER'; payload: Cashier }
    | { type: 'RESET_CASHIER' };

// Define the initial state
const initialState: SalesState = {
    sales: localStorage.getItem('sales') ? JSON.parse(localStorage.getItem('sales') || '[]') : sampleSales,
    selectedCashier: localStorage.getItem('selectedCashier') ? JSON.parse(localStorage.getItem('selectedCashier') as string) : null,
};


const salesReducer = (state: SalesState, action: SalesAction): SalesState => {
    switch (action.type) {
        case 'ADD_SALE':
            const newSales = [...state.sales, action.payload];
            localStorage.setItem('sales', JSON.stringify(newSales));
            return { ...state, sales: newSales };
        case 'RESET_SALES':
            localStorage.removeItem('sales');
            return { ...state, sales: [] };
        case 'SET_CASHIER':
            localStorage.setItem('selectedCashier', JSON.stringify(action.payload));
            return { ...state, selectedCashier: action.payload };
        case 'RESET_CASHIER':
            localStorage.removeItem('selectedCashier');
            return { ...state, selectedCashier: null };
        default:
            return state;
    }
};

const SalesContext = createContext<{
    state: SalesState;
    dispatch: React.Dispatch<SalesAction>;
    setCashier: (cashier: Cashier) => void;
    resetCashier: () => void;
    addSale: (total: number) => void;
    getSelectedCashierId: () => number
}>({
    state: initialState,
    dispatch: () => undefined,
    setCashier: () => undefined,
    resetCashier: () => undefined,
    addSale: () => undefined,
    getSelectedCashierId: () => 0
});

interface SalesProviderProps {
    children: ReactNode;
}

export const SalesProvider = ({ children }: SalesProviderProps) => {
    const [state, dispatch] = useReducer(salesReducer, initialState);

    // Define the setCashier function
    const setCashier = (cashier: Cashier) => {
        dispatch({ type: 'SET_CASHIER', payload: cashier });
    };

    const resetCashier = () => {
        dispatch({ type: 'RESET_CASHIER' });
    };

    const addSale = (total: number) => {
        const saleAmount = total;
        const cashierId = state.selectedCashier?.id;
        if (cashierId && total > 0) {
            const sale: Sale = { cashierId, saleAmount };
            dispatch({ type: 'ADD_SALE', payload: sale });
        }
    }

    const getSelectedCashierId = (): number => {
        return state.selectedCashier?.id || 0;
    }

    return (
        <SalesContext.Provider value={{ state, dispatch, setCashier, resetCashier, addSale, getSelectedCashierId }}>
            {children}
        </SalesContext.Provider>
    );
};

// Custom hook to use the Sales context
export const useSales = () => useContext(SalesContext);
