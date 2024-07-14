describe('Select Cashier Page Test', () => {
    const navigateToDashboardPage = () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-testid="cashier-1-card"]').click();
    }

    it('should load Sales Dashboard Page', () => {
        navigateToDashboardPage();
        cy.contains('Sales Dashboard').should('be.visible');
        cy.contains('Sales Dashboard').should('be.visible');
        cy.contains('Cashier 1').should('be.visible');
        cy.contains('Switch Cashier').should('be.visible');
        cy.contains('Add Sale').should('be.visible');
    });

    it('should navigate back to Select Cashier', () => {
        navigateToDashboardPage();
        cy.contains('button', 'Switch Cashier').click();
        cy.contains('Select Cashier').should('be.visible');
    });

    it('should navigate to Add Sale Page', () => {
        navigateToDashboardPage();
        cy.contains('button', 'Add Sale').click();
        cy.contains('Add Sale').should('be.visible');
        cy.contains('Cashier 1').should('be.visible');
    });
});
