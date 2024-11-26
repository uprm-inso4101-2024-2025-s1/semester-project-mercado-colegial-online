describe('Login Edge Cases', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login'); // Replace with your actual login page URL
  });

  it('should not allow empty fields', () => {
    cy.get('#login-button').click();
    cy.get('.error-message').should('contain', 'Email and password are required');
  });

  it('should not allow invalid email formats', () => {
    const invalidEmails = ['plainaddress', 'missingdomain@', '@missingusername.com'];
    invalidEmails.forEach((email) => {
      cy.get('#email-input').clear().type(email);
      cy.get('#password-input').type('ValidPass123!');
      cy.get('#login-button').click();
      cy.get('.error-message').should('contain', 'Invalid email format');
    });
  });

  it('should not allow login with incorrect password', () => {
    cy.get('#email-input').type('validuser@example.com');
    cy.get('#password-input').type('WrongPass123!');
    cy.get('#login-button').click();
    cy.get('.error-message').should('contain', 'Incorrect email or password');
  });

  it('should not allow login with unregistered email', () => {
    cy.get('#email-input').type('unregistered@example.com');
    cy.get('#password-input').type('ValidPass123!');
    cy.get('#login-button').click();
    cy.get('.error-message').should('contain', 'Email is not registered');
  });

  it('should lock account after multiple failed login attempts', () => {
    cy.get('#email-input').type('validuser@example.com');
    for (let i = 0; i < 5; i++) {
      cy.get('#password-input').clear().type('WrongPass123!');
      cy.get('#login-button').click();
    }
    cy.get('.error-message').should('contain', 'Account locked due to multiple failed attempts');
  });

  it('should handle extremely long email input gracefully', () => {
    const longEmail = 'a'.repeat(256) + '@example.com';
    cy.get('#email-input').type(longEmail);
    cy.get('#password-input').type('ValidPass123!');
    cy.get('#login-button').click();
    cy.get('.error-message').should('contain', 'Input exceeds character limit');
  });

  it('should not allow login with SQL injection attempts', () => {
    const sqlInjection = "' OR 1=1; --";
    cy.get('#email-input').type(sqlInjection);
    cy.get('#password-input').type(sqlInjection);
    cy.get('#login-button').click();
    cy.get('.error-message').should('contain', 'Invalid email or password');
    cy.get('#login-button').should('not.trigger', 'unauthorized access');
  });

  it('should detect and handle bot attempts (CAPTCHA)', () => {
    // Assuming CAPTCHA is in place
    cy.get('#email-input').type('bot@example.com');
    cy.get('#password-input').type('ValidPass123!');
    cy.get('#login-button').click();
    cy.get('.error-message').should('contain', 'CAPTCHA verification failed');
  });

  it('should not allow login if account is disabled or banned', () => {
    cy.get('#email-input').type('banneduser@example.com');
    cy.get('#password-input').type('ValidPass123!');
    cy.get('#login-button').click();
    cy.get('.error-message').should('contain', 'Your account is disabled');
  });

  it('should expire session tokens after inactivity', () => {
    // Simulating an expired session
    cy.get('#email-input').type('validuser@example.com');
    cy.get('#password-input').type('ValidPass123!');
    cy.get('#login-button').click();
    cy.wait(3600000); // Simulating 1 hour of inactivity
    cy.reload();
    cy.get('.error-message').should('contain', 'Your session has expired. Please log in again.');
  });

  it('should validate case sensitivity for email and password', () => {
    cy.get('#email-input').type('ValidUser@example.com');
    cy.get('#password-input').type('validpass123!'); // Incorrect case
    cy.get('#login-button').click();
    cy.get('.error-message').should('contain', 'Incorrect email or password');
  });
});
