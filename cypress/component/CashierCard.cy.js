import React from 'react';
import { mount } from '@cypress/react18';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CashierCard from '../../src/components/CashierCard';
import { SalesProvider, SalesContext } from '../../src/context/SalesContext';

describe('CashierCard Component', () => {
    const theme = createTheme();

    const renderComponent = (props, contextValue) => {
        return mount(
            <SalesProvider>
                <ThemeProvider theme={theme}>
                    <SalesContext.Provider value={contextValue}>
                        <CashierCard {...props} />
                    </SalesContext.Provider>
                </ThemeProvider>
            </SalesProvider>
        );
    };

    it('renders cashier name and prompt', () => {
        const cashier = { id: 1, name: 'John Doe' };
        const contextValue = { getSelectedCashierId: () => null };

        renderComponent({ cashier, handleItemClick: cy.stub() }, contextValue);

        cy.contains('John Doe').should('be.visible');
        cy.contains('Click here to select John Doe').should('be.visible');
    });

    it('calls handleItemClick when card is clicked', () => {
        const cashier = { id: 1, name: 'John Doe' };
        const handleItemClick = cy.stub();
        const contextValue = { getSelectedCashierId: () => null };

        renderComponent({ cashier, handleItemClick }, contextValue);

        cy.get(`[data-testid="cashier-${cashier.id}-card"]`)
            .should('be.visible')
            .click()
            .then(() => {
                expect(handleItemClick).to.have.been.calledWith(cashier);
            });
    });
});
