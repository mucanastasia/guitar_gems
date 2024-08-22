describe('Desktop: Testing Sign In and Sign Out', () => {
  context('macbook-15 resolution', () => {
    beforeEach(() => {
      cy.viewport(1440, 900);
       cy.visit('/');
    });

    it('Should successfully sign in with valid email and password, then sign out', () => {
        cy.contains('Sign In').click();
        cy.url().should('include', '/sign-in');
        cy.contains('Sign In');
        cy.get('.react-aria-Form').should('be.visible');

        cy.fixture('valid_user').then((user) => {
          cy.get('input[name="Email"]').type(user.email);
          cy.get('input[name="Email"]').should('have.value', user.email);

          cy.get('input[name="Password"]').type(user.password);
          cy.get('input[name="Password"]').should('have.value', user.password);
        });

        cy.get('button[type="submit"]').should('contain', 'Sign In').click();

        cy.url().should('include', '/').and('not.include', '/sign-in');
        cy.get('button.header-link').should('be.visible')
        .and('contain', 'account_circle')
        .and('contain', 'Test')
        .click();

        cy.get('.react-aria-Popover[data-trigger="DialogTrigger"]').should('be.visible')
        .and('contain', 'Sign Out')
        .click();

        cy.url().should('include', '/').and('not.include', '/sign-in');
        cy.get('a.header-link').should('contain', 'login').and('contain', 'Sign In');
        cy.get('button.header-link').should('not.exist');
      });
  });
});



describe('Mobile: Testing Sign In and Sign Out', () => {
  context('iphone-6+ resolution', () => {
    beforeEach(() => {
      cy.viewport(414, 736)
      cy.visit('/');
    });

    it('Should successfully sign in with valid email and password, then sign out', () => {
        cy.contains('Sign In').click();

        cy.url().should('include', '/sign-in');
        cy.contains('Sign In');
        cy.get('.react-aria-Form').should('be.visible');

        cy.fixture('valid_user').then((user) => {
          cy.get('input[name="Email"]').type(user.email);
          cy.get('input[name="Email"]').should('have.value', user.email);

          cy.get('input[name="Password"]').type(user.password);
          cy.get('input[name="Password"]').should('have.value', user.password);
        });

        cy.get('button[type="submit"]').should('contain', 'Sign In').click();

        cy.url().should('include', '/').and('not.include', '/sign-in');
        cy.get('button.header-link').should('be.visible')
        .and('contain', 'account_circle')
        .and('contain', 'Test')
        .click();

        cy.get('.react-aria-Popover[data-trigger="DialogTrigger"]').should('be.visible')
        .and('contain', 'Sign Out')
        .click();

        cy.url().should('include', '/').and('not.include', '/sign-in');
        cy.get('a.header-link').should('contain', 'login').and('contain', 'Sign In');
        cy.get('button.header-link').should('not.exist');
      });
    });
});