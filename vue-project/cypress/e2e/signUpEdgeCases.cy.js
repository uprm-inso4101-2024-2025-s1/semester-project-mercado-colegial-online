describe('Sign-Up Edge Cases', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/registration'); // Replace with your actual sign-up page URL
  });

  it('should reject non-institutional emails', () => {
    cy.get('#Name').type('Test User');
    cy.get('#institutionalEmail').type('user@gmail.com'); // Non-institutional email
    cy.get('#studentNumber').type('802-12-3456');
    cy.get('#signUpPassword').type('ValidPassword1!');
    cy.get('#signUpPassword1').type('ValidPassword1!');
    cy.get('#captchaInput').type('captcha');
    cy.get('.btn').click();
    cy.on('window:alert', (text) => {
        expect(text).to.equal('Email incorrecto.');
    });
  });


  it('should reject invalid student numbers', () => {
    cy.get('#Name').type('Test User');
    cy.get('#institutionalEmail').type('user@upr.edu');
    cy.get('#studentNumber').type('123-45-6789'); // Invalid student number
    cy.get('#signUpPassword').type('ValidPassword1!');
    cy.get('#signUpPassword1').type('ValidPassword1!');
    cy.get('#captchaInput').type('captcha');
    cy.get('.btn').click();
    cy.on('window:alert', (text) => {
        expect(text).to.equal('El número de estudiante es incorrecto.');
    });
  });

  it('should reject incorrect CAPTCHA input', () => {
    cy.get('#Name').type('Test User');
    cy.get('#institutionalEmail').type('user@upr.edu');
    cy.get('#studentNumber').type('802-12-3456');
    cy.get('#signUpPassword').type('ValidPassword1!');
    cy.get('#signUpPassword1').type('ValidPassword1!');
    cy.get('#captchaInput').type('wrongcaptcha'); // Incorrect CAPTCHA
    cy.get('.btn').click();
    cy.get('.error').should('contain', 'Incorrect CAPTCHA. Please try again.');
  });

  it('should require shop name for sellers', () => {
    cy.get('#Name').type('Seller User');
    cy.get('#institutionalEmail').type('seller@upr.edu');
    cy.get('#studentNumber').type('802-12-3456');
    cy.get('#signUpPassword').type('ValidPassword1!');
    cy.get('#signUpPassword1').type('ValidPassword1!');
    cy.get('#isSeller').check();
    cy.get('.btn').click();
    cy.on('window:alert', (text) => {
        expect(text).to.equal('Please provide a shop name.');
    });
  });

  it('should reject invalid passwords', () => {

    const invalidPasswords = [
        { value: 'short1!', error: 'Password must be between 8 and 30 characters long.' },
        { value: 'alllowercase1!', error: 'Password must contain at least one uppercase letter.' },
        { value: 'ALLUPPERCASE1!', error: 'Password must contain at least one lowercase letter.' },
        { value: 'NoNumber!', error: 'Password must contain at least one number.' },
        { value: 'NoSpecial1', error: 'Password must contain at least one special character.' },
        { value: 'aaaaaaaA1!', error: 'Password contains repetitive characters (e.g., \'aaaa\', \'1111\').' },
        { value: 'abc123A!', error: 'Password contains a sequential pattern (e.g., \'123\', \'abc\').' },
        { value: 'password1!', error: 'Password is too common.' },
    ];

  });

});

describe('Password Validation Tests', () => {
  beforeEach(() => {
      cy.visit('http://localhost:5173/registration');
      cy.get('#Name').type('Test User');
      cy.get('#institutionalEmail').type('user@upr.edu');
      cy.get('#studentNumber').type('802-12-3456');
      cy.get('#captchaInput').type('captcha');
  });

  it('should reject passwords shorter than 8 characters', () => {
      cy.get('#signUpPassword').type('Short1!');
      cy.get('#signUpPassword1').type('Short1!');

      cy.window().then((win) => {
          cy.stub(win, 'alert').as('alertStub');
      });

      cy.get('.btn').click();

      cy.get('@alertStub').should('be.calledWith', 'Password must be between 8 and 30 characters long.');
  });

  it('should reject passwords without an uppercase letter', () => {
      cy.get('#signUpPassword').type('lowercase1!');
      cy.get('#signUpPassword1').type('lowercase1!');

      cy.window().then((win) => {
          cy.stub(win, 'alert').as('alertStub');
      });

      cy.get('.btn').click();

      cy.get('@alertStub').should('be.calledWith', 'Password must contain at least one uppercase letter.');
  });

  it('should reject passwords without a lowercase letter', () => {
      cy.get('#signUpPassword').type('UPPERCASE1!');
      cy.get('#signUpPassword1').type('UPPERCASE1!');

      cy.window().then((win) => {
          cy.stub(win, 'alert').as('alertStub');
      });

      cy.get('.btn').click();

      cy.get('@alertStub').should('be.calledWith', 'Password must contain at least one lowercase letter.');
  });

  it('should reject passwords without a number', () => {
      cy.get('#signUpPassword').type('NoNumbers!');
      cy.get('#signUpPassword1').type('NoNumbers!');

      cy.window().then((win) => {
          cy.stub(win, 'alert').as('alertStub');
      });

      cy.get('.btn').click();

      cy.get('@alertStub').should('be.calledWith', 'Password must contain at least one number.');
  });

  it('should reject passwords without a special character', () => {
      cy.get('#signUpPassword').type('NoSpecial1');
      cy.get('#signUpPassword1').type('NoSpecial1');

      cy.window().then((win) => {
          cy.stub(win, 'alert').as('alertStub');
      });

      cy.get('.btn').click();

      cy.get('@alertStub').should('be.calledWith', 'Password must contain at least one special character.');
  });

  it('should reject passwords with repetitive characters', () => {
      cy.get('#signUpPassword').type('Aaaa1111!');
      cy.get('#signUpPassword1').type('Aaaa1111!');

      cy.window().then((win) => {
          cy.stub(win, 'alert').as('alertStub');
      });

      cy.get('.btn').click();

      cy.get('@alertStub').should('be.calledWith', 'Password contains repetitive characters (e.g., \'aaaa\', \'1111\').');
  });

  it('should reject passwords with sequential characters', () => {
      cy.get('#signUpPassword').type('123abcDEF!');
      cy.get('#signUpPassword1').type('123abcDEF!');

      cy.window().then((win) => {
          cy.stub(win, 'alert').as('alertStub');
      });

      cy.get('.btn').click();

      cy.get('@alertStub').should('be.calledWith', 'Password contains a sequential pattern (e.g., \'123\', \'abc\').');
  });
});

