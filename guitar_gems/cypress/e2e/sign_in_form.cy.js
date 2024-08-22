describe('Desktop: Testing Sign-In Form', () => {
  context('macbook-15 resolution', () => {
    beforeEach(() => {
      cy.viewport(1440, 900);
       cy.visit('/sign-in');
    });

    it('Should display errors when email or password fields are focused and blurred without input', () => {
      cy.contains('Sign In');
      cy.get('.react-aria-Form').should('be.visible');

      // Ensure no errors are shown initially
      cy.get('span.error')
      .should('have.length', 2)
      .each(($error_messages) => {
        cy.wrap($error_messages).should('be.visible').and('have.text', '');
      });

      cy.get('input[name="Email"]').focus().blur();

      cy.get('span.error')
      .should('have.length', 2)
      .then(($error_messages) => {
        cy.wrap($error_messages[0]).should('be.visible').and('contain', 'Please fill in this field');
        cy.wrap($error_messages[1]).should('be.visible').and('have.text', '');
      });

      cy.get('input[name="Password"]').focus().blur();

      // Check that both fields shows the required error message
      cy.get('span.error')
      .should('have.length', 2)
      .each(($error_messages) => {
        cy.wrap($error_messages).should('be.visible').and('contain', 'Please fill in this field');
      });
    });

     it('Should display errors when submitting the form with empty fields', () => {
      cy.contains('Sign In');
      cy.get('.react-aria-Form').should('be.visible');

      // Ensure no errors are shown initially
      cy.get('span.error')
      .should('have.length', 2)
      .each(($error_messages) => {
        cy.wrap($error_messages).should('be.visible').and('have.text', '');
      });

      cy.get('button[type="submit"]').should('contain', 'Sign In').click();

      cy.get('span.error')
      .should('have.length', 2)
      .each(($error_messages) => {
        cy.wrap($error_messages).should('be.visible').and('contain', 'Please fill in this field');
      });

      cy.get('input[name="Email"]').type('test').clear();

      cy.get('span.error')
      .should('have.length', 2)
      .then(($error_messages) => {
        cy.wrap($error_messages[0]).should('be.visible').and('have.text', '');
        cy.wrap($error_messages[1]).should('be.visible').and('contain', 'Please fill in this field');
      });

      cy.get('button[type="submit"]').should('contain', 'Sign In').click();

      cy.get('span.error')
      .should('have.length', 2)
      .each(($error_messages) => {
        cy.wrap($error_messages).should('be.visible').and('contain', 'Please fill in this field');
      });
    });

      it('Should display an error for an invalid email format', () => {
      cy.contains('Sign In');
      cy.get('.react-aria-Form').should('be.visible');

      cy.get('input[name="Email"]').type('invalidEmail').blur();
      cy.get('span.error')
      .should('have.length', 2)
      .then(($error_messages) => {
        cy.wrap($error_messages[0]).should('be.visible').and('contain', 'Please provide a correct email');
        cy.wrap($error_messages[1]).should('be.visible').and('have.text', '');
      });

      // Check that the error disappears when the email becomes valid
      cy.get('input[name="Email"]').type('@mail.com');
      cy.get('span.error')
      .should('have.length', 2)
      .each(($error_messages) => {
        cy.wrap($error_messages).should('be.visible').and('contain', '');
      });

      cy.get('input[name="Email"]').type('tooLong').blur();
      cy.get('span.error')
      .should('have.length', 2)
      .then(($error_messages) => {
        cy.wrap($error_messages[0]).should('be.visible').and('contain', 'Please provide a correct email');
        cy.wrap($error_messages[1]).should('be.visible').and('have.text', '');
      });

      cy.get('input[name="Email"]').clear().type('invalidImail@mail').blur();
      cy.get('span.error')
      .should('have.length', 2)
      .then(($error_messages) => {
        cy.wrap($error_messages[0]).should('be.visible').and('contain', 'Please provide a correct email');
        cy.wrap($error_messages[1]).should('be.visible').and('have.text', '');
      });
    });

    it ('Should display an error for a password shorter than 6 characters', () => {
      cy.contains('Sign In');
      cy.get('.react-aria-Form').should('be.visible');

      cy.get('span.error')
      .should('have.length', 2)
      .each(($error_messages) => {
        cy.wrap($error_messages).should('be.visible').and('have.text', '');
      });

      cy.get('input[name="Password"]').type('123').blur();

      cy.get('span.error')
      .should('have.length', 2)
      .then(($error_messages) => {
        cy.wrap($error_messages[0]).should('be.visible').and('have.text', '');
        cy.wrap($error_messages[1]).should('be.visible').and('contain', 'Password must include at least 6 symbols');
      });

      cy.get('input[name="Password"]').type('45');
      cy.get('span.error')
      .should('have.length', 2)
      .then(($error_messages) => {
        cy.wrap($error_messages[0]).should('be.visible').and('have.text', '');
        cy.wrap($error_messages[1]).should('be.visible').and('contain', 'Password must include at least 6 symbols');
      });

      cy.get('input[name="Password"]').type('6');
      cy.get('span.error')
      .should('have.length', 2)
      .each(($error_messages) => {
        cy.wrap($error_messages).should('be.visible').and('have.text', '');
        });
    });

    it('Should display a general error when valid credentials are submitted but the user does not exist', () => {
        cy.contains('Sign In');
        cy.get('.react-aria-Form').should('be.visible');

        cy.fixture('invalid_user').then((user) => {
          cy.get('input[name="Email"]').type(user.email);
          cy.get('input[name="Password"]').type(user.password).blur();
        });

        cy.get('span.error')
        .should('have.length', 2)
        .each(($error_messages) => {
          cy.wrap($error_messages).should('be.visible').and('have.text', '');
        });

        cy.get('button[type="submit"]').should('contain', 'Sign In').click();

        cy.get('span.error-general')
        .should('be.visible')
        .and('have.text', 'Invalid email or password. Please try again');
    });

    it('Should successfully sign in with valid credentials', () => {
      cy.contains('Sign In');
      cy.get('.react-aria-Form').should('be.visible');

      cy.fixture('valid_user').then((user) => {
        cy.get('input[name="Email"]').type(user.email);
        cy.get('input[name="Email"]').should('have.value', user.email);

        cy.get('input[name="Password"]').type(user.password);
        cy.get('input[name="Password"]').should('have.value', user.password);
      });

      // Toggle password visibility
      cy.get('input[name="Password"]').should('have.attr', 'type', 'password');

      cy.contains('visibility').click();
      cy.get('input[name="Password"]').should('have.attr', 'type', 'text');

      cy.contains('visibility_off').click();
      cy.get('input[name="Password"]').should('have.attr', 'type', 'password');


      cy.get('button[type="submit"]').should('contain', 'Sign In').click();

      // Verify successful redirection
      cy.url().should('include', '/').and('not.include', '/sign-in');
      cy.get('button.header-link').should('be.visible')
      .and('contain', 'account_circle')
      .and('contain', 'Test');
    });
  });
});