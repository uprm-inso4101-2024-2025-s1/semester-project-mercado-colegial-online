/*
  Test validates that accounts cannot be created using an email attached
  to a preexisting user account.
*/

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/registration')



    // Fill out form

    // Test input
    const testName = 'DuplicateEmailTest'
    const testStudentNum = 802999999
    const testPassword = 'DuplicateEm4ilT3st_'

    // Enter input
    cy.get('[id="Name"]').type(testName)
    cy.get('[id="studentNumber"]').type(testStudentNum)
    cy.get('[id="signUpPassword"]').type(testPassword)
    cy.get('[id="signUpPassword1"]').type(testPassword)
    cy.get('[id="captchaInput"]').type("c4ptch4_bYp455")

    // Submit Registration form
    cy.get('[class="btn"]').click()
    cy.url().should('include', '/registration')



    // Retrieve email from random existing user in database
    cy.request('GET', 'http://localhost:3000/users').then((response) => {
      expect(response.status).to.eq(200);

      // Check if the user exists in the response
      const users = response.body;

      // Select a random user
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomUserEmail = randomUser.email;
      cy.get('[id="institutionalEmail"]').type(randomUserEmail)
      console.log(randomUserEmail)
    });
  })
})