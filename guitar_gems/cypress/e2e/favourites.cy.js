describe('Desktop: Testing My Picks', () => {
  context('macbook-15 resolution', () => {
    beforeEach(() => {
      cy.viewport(1440, 900);
       cy.visit('/');
    });

    it('Should redirect to the sign-in page if the user is non-authenticated', () => {
      cy.get('a.header-link').contains('My picks').should('not.exist');

      cy.contains('favorite').first().click();

      cy.url().should('include', '/sign-in');
      cy.contains('Sign In');
      cy.get('.react-aria-Form').should('be.visible');
      });

    it('Should redirect when a non-authenticated user tries to access My Picks directly', () => {
      cy.visit('/my-picks');

      cy.url().should('include', '/sign-in');
      cy.contains('Sign In');
      cy.get('.react-aria-Form').should('be.visible');
    });

    it('My Picks page should be accessible for authenticated users', () => {
      cy.get('a.header-link').contains('My picks').should('not.exist');

      cy.fixture('valid_user').then((user) => {
        cy.signIn(user.email, user.password);
      });

      cy.contains('My picks').click();
      cy.contains(`Test's picks`);
    });
  });
});