import CryptoJS from "crypto-js"
import crypto from "crypto"

/*
  Test to validate that the input entered by the user is properly saved
  in the database.

  Additionally, password hashing is validated because hashing the input is
  necessary for comparing the stored database value with the input value.
  If the password hashing process is not working properly, it will result
  in a failed validation for the passowrd field.

  Note: To run, tester must modify all fields under the 'Test input' section
  to values not present in the database. If not, test will fail.
*/


describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/registration')

    var failedValidations = []



    // Fill out form

    // Test input
    const testName = 'Test6'
    const testEmail = 'test6@upr.edu'
    const testStudentNum = 802000006
    const testPassword = 'Tester_6'

    // Enter input
    cy.get('[id="Name"]').type(testName)
    cy.get('[id="institutionalEmail"]').type(testEmail)
    cy.get('[id="studentNumber"]').type(testStudentNum)
    cy.get('[id="signUpPassword"]').type(testPassword)
    cy.get('[id="signUpPassword1"]').type(testPassword)
    cy.get('[id="captchaInput"]').type("c4ptch4_bYp455")

    // Submit Registration form
    cy.get('[class="btn"]').click()
    cy.url().should('include', '/home');



    // Input validation with database
    cy.request('GET', 'http://localhost:3000/users').then((response) => {
      expect(response.status).to.eq(200);

      // Check if the user exists in the response
      const users = response.body;
      const user = users.find((u) => u.email === testEmail);

      // expect(user).to.exist; // Ensure the user exists
      if(user.name != testName){failedValidations.push("name")}
      if(user.email != testEmail){failedValidations.push("email")}
      if(user.student_num != testStudentNum){failedValidations.push("student number")}
      if(user.role != "student"){failedValidations.push("role")}

      // Validate password
      const testPasswordHashed = CryptoJS.SHA512(testPassword).toString();
      const testPasswordHashed2 = crypto.pbkdf2Sync(testPasswordHashed, user.salt, 1000, 64, 'sha512').toString('hex');
      if(user.password != testPasswordHashed2){failedValidations.push("password")}



      // Print failed validations for debugging
      console.log(failedValidations)

      expect(failedValidations).to.have.length(0)
    });
    
  })
})