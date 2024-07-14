import React from 'react';
import { mount } from '@cypress/react18';
import { BrowserRouter } from 'react-router-dom';
import { SalesProvider, SalesContext } from '../../src/context/SalesContext';
import HeaderBar from '../../src/components/HeaderBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

describe('HeaderBar Component', () => {
  const theme = createTheme();

  const renderComponent = (props, contextValue) => {
    return mount(
        <SalesProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <SalesContext.Provider value={contextValue}>
                <HeaderBar {...props} />
              </SalesContext.Provider>
            </BrowserRouter>
          </ThemeProvider>
        </SalesProvider>
    );
  };

  it('renders title and back button when showBackButton is true', () => {
    const contextValue = { state: { selectedCashier: { name: 'John Doe' } } };
    renderComponent({ showBackButton: true, title: 'Dashboard', showCashierName: true }, contextValue);

    cy.contains('Dashboard').should('be.visible');
    cy.contains('Back').should('be.visible');
    cy.contains('John Doe').should('be.visible');
  });

  it('renders title without back button when showBackButton is false', () => {
    const contextValue = { state: { selectedCashier: { name: 'John Doe' } } };
    renderComponent({ showBackButton: false, title: 'Dashboard', showCashierName: true }, contextValue);

    cy.contains('Dashboard').should('be.visible');
    cy.contains('Back').should('not.exist');
    cy.contains('John Doe').should('be.visible');
  });

  it('does not render cashier name when showCashierName is false', () => {
    const contextValue = { state: { selectedCashier: { name: 'John Doe' } } };
    renderComponent({ showBackButton: true, title: 'Dashboard', showCashierName: false }, contextValue);

    cy.contains('Dashboard').should('be.visible');
    cy.contains('Back').should('be.visible');
    cy.contains('John Doe').should('not.exist');
  });

  it('navigates back when back button is clicked', () => {
    const contextValue = { state: { selectedCashier: { name: 'John Doe' } } };
    renderComponent({ showBackButton: true, title: 'Dashboard', showCashierName: true }, contextValue);

    cy.contains('Back').click();
  });
});
