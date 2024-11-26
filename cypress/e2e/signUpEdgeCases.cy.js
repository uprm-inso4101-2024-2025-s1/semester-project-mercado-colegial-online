describe('Sign-Up Edge Cases', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/registration'); // Replace with your actual sign-up page URL
  });

  it('should not allow empty fields', () => {
    cy.get('#submit-button').click();
    cy.get('.error-message').should('contain', 'All fields are required');
  });

  it('should not allow invalid email formats', () => {
    const invalidEmails = ['plainaddress', '@missingusername.com', 'username@.com'];
    invalidEmails.forEach((email) => {
      cy.get('#email-input').clear().type(email);
      cy.get('#submit-button').click();
      cy.get('.error-message').should('contain', 'Invalid email format');
    });
  });

  it('should not allow passwords shorter than the minimum length', () => {
    cy.get('#password-input').type('short');
    cy.get('#submit-button').click();
    cy.get('.error-message').should('contain', 'Password must be at least 8 characters');
  });

  it('should not allow passwords without required complexity', () => {
    const invalidPasswords = ['password', '12345678', 'alllowercase', 'ALLUPPERCASE'];
    invalidPasswords.forEach((password) => {
      cy.get('#password-input').clear().type(password);
      cy.get('#submit-button').click();
      cy.get('.error-message').should('contain', 'Password must include uppercase, lowercase, numbers, and special characters');
    });
  });

  it('should not allow mismatched passwords in confirmation', () => {
    cy.get('#password-input').type('ValidPass123!');
    cy.get('#confirm-password-input').type('DifferentPass123!');
    cy.get('#submit-button').click();
    cy.get('.error-message').should('contain', 'Passwords do not match');
  });

  it('should not allow duplicate usernames or emails', () => {
    cy.get('#username-input').type('existingUser');
    cy.get('#email-input').type('existing@example.com');
    cy.get('#password-input').type('ValidPass123!');
    cy.get('#confirm-password-input').type('ValidPass123!');
    cy.get('#submit-button').click();
    cy.get('.error-message').should('contain', 'Username or email already in use');
  });

  it('should not allow invalid characters in username', () => {
    const invalidUsernames = ['user!', 'user@', 'user#', 'user$', 'user%'];
    invalidUsernames.forEach((username) => {
      cy.get('#username-input').clear().type(username);
      cy.get('#submit-button').click();
      cy.get('.error-message').should('contain', 'Username contains invalid characters');
    });
  });

  it('should handle extremely long input gracefully', () => {
    const longUsername = 'a'.repeat(256);
    const longEmail = 'a'.repeat(250) + '@example.com';
    cy.get('#username-input').type(longUsername);
    cy.get('#email-input').type(longEmail);
    cy.get('#password-input').type('ValidPass123!');
    cy.get('#confirm-password-input').type('ValidPass123!');
    cy.get('#submit-button').click();
    cy.get('.error-message').should('contain', 'Input exceeds character limit');
  });

  it('should detect potential bot sign-up attempts', () => {
    // Assuming CAPTCHA is in place
    cy.get('#username-input').type('botTest');
    cy.get('#email-input').type('bot@example.com');
    cy.get('#password-input').type('ValidPass123!');
    cy.get('#confirm-password-input').type('ValidPass123!');
    cy.get('#submit-button').click();
    cy.get('.error-message').should('contain', 'CAPTCHA verification failed');
  });

  it('should reject sign-up from unsupported domains', () => {
    const unsupportedEmail = 'user@unsupported.com';
    cy.get('#email-input').type(unsupportedEmail);
    cy.get('#submit-button').click();
    cy.get('.error-message').should('contain', 'Email domain not supported');
  });

  it('should prevent sign-up for underage users (if age check is present)', () => {
    cy.get('#dob-input').type('2015-01-01'); // Example for age < 18
    cy.get('#submit-button').click();
    cy.get('.error-message').should('contain', 'You must be at least 18 years old to sign up');
  });
});
