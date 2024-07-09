describe('Select Cashier Page Test', () => {
    it('should navigate to Select Cashier page by default', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Select Cashier').should('be.visible');
    });

    it('should navigate to Sales Dashboard page after selecting a cashier', () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-testid="cashier-1-card"]').click();
        cy.url().should('include', '/dashboard');
        cy.contains('Sales Dashboard').should('be.visible');
        cy.contains('Cashier 2').should('be.visible');
    });

    it('should navigate to Sales Dashboard and show a different cashier selected', () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-testid="cashier-2-card"]').click();
        cy.url().should('include', '/dashboard');
        cy.contains('Sales Dashboard').should('be.visible');
        cy.contains('Cashier 3').should('be.visible');
    });
});
