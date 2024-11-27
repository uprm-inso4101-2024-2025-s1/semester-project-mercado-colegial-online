describe('Login Edge Cases', () => {
  beforeEach(() => {
    cy.visit('/login'); // Ensure this matches the route of your login page
  });

  it('should find and click the login button', () => {
    cy.get('[data-test-id="login-button"]') // Select button by data-test-id
      .should('be.visible') // Check if it is visible
      .click(); // Simulate the click
  });

  it('should not allow empty fields', () => {
    cy.get('[data-test-id="login-button"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Please fill in all fields to continue');
    });
  });

  it('should not allow invalid email formats', () => {
    cy.get('[data-test-id="email-input"]').type('invalid-email');
    cy.get('[data-test-id="pass-input"]').type('password123!');
    cy.get('[data-test-id="login-button"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.include('Invalid email format'); // Adjust message if validation logic is added
    });
  });

  it('should show an error for non-existent users', () => {
    cy.get('[data-test-id="email-input"]').type('nonexistent@example.com');
    cy.get('[data-test-id="pass-input"]').type('password123!');
    cy.get('[data-test-id="login-button"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Error submitting data');
    });
  });

});
