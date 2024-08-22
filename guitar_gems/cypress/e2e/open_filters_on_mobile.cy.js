describe('Mobile: Testing Filters drawer', () => {
  context('iphone-6+ resolution', () => {
    beforeEach(() => {
      cy.viewport(414, 736)
      cy.visit('/');
    });

   it('Should successfully open and interact with the filters drawer on mobile', () => {
        cy.contains('Filters').should('be.visible').click();
        //({force: true});

        cy.contains('Apply filters').should('be.visible');
        cy.contains('Clear filters').should('be.visible');

        // Apply various filters and check the URL for correct parameters
        cy.contains('Gibson').click();
        cy.url().should('include', '/?brands=2');

        cy.contains('Bass').click();
        cy.url().should('include', '/?brands=2&types=3');

        cy.contains('Acoustic').click();
        cy.url().should('include', '/?brands=2&types=3%2C2');

        cy.contains('United States').click();
        cy.url().should('include', '/?brands=2&countries=1&types=3%2C2');

        // Clear all filters and verify the URL is reset
        cy.contains('Clear filters').click();
        cy.url().should('not.include', '/?brands=2&countries=1&types=3%2C2');

        // Close the filters drawer
        cy.get('button[data-test="drawer-close-button"]').click();
        cy.contains('Apply filters').should('not.be.visible');
      });
    });
});