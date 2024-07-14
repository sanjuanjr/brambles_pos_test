import products_sample from '../../src/data/products_sample.json'

describe('Select Cashier Page Test', () => {
    const navigateToAddSalePage = () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-testid="cashier-1-card"]').click();
        cy.contains('button', 'Add Sale').click();
    }

    it('should load Add Sale Page', () => {
        navigateToAddSalePage();
        cy.contains('Add Sale').should('be.visible');
        cy.contains('Cashier 1').should('be.visible');
        cy.contains('Products').should('be.visible');
        cy.contains('Submit Sale').should('be.visible');


        cy.get('table').within(() => {
            cy.get('thead tr').within(() => {
                cy.get('th').eq(0).should('have.text', 'Product Name');
                cy.get('th').eq(1).should('have.text', 'Price');
                cy.get('th').eq(2).should('have.text', 'Quantity');
                cy.get('th').eq(3).should('have.text', 'Total');
            });

            products_sample.forEach((product, index) => {
                cy.get('tbody tr').eq(index).within(() => {
                    cy.get('th').eq(0).should('have.text', product.name);
                    cy.get('td').eq(0).should('have.text', `$${product.price}`);
                });
            })
        })
    });

    it('should navigate back to Sales Dashboard', () => {
        navigateToAddSalePage();
        cy.contains('button', 'Back').click();
        cy.contains('Sales Dashboard').should('be.visible');
    });
});
