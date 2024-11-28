describe('Home Page', () => {
    beforeEach(() => {
      // Visit the home page before each test
      cy.visit('/home');
    });
  
    it('should render the Navbar component', () => {
      // Check if the Navbar component is visible
      cy.get('nav').should('be.visible');
    });
  
    it('should render the search bar within the image section', () => {
      // Verify the presence of the search bar within the image section
      cy.get('.image-section')
        .should('be.visible')
        .within(() => {
          cy.get('.search-container').should('be.visible');
        });
    });
  
    it('should display the correct number of featured products', () => {
      // Ensure the correct number of featured products are displayed
      cy.get('.featured-products-section')
        .find('.product-card')
        .should('have.length', 8);
    });
  
    it('should render each product with correct details', () => {
      // Define the expected products
      const products = [
        { id: 1, name: 'Custom T-shirt', price: '$19.99' },
        { id: 2, name: 'RUM Lanyard', price: '$19.99' },
        { id: 3, name: 'UPRM Hoodie', price: '$19.99' },
        { id: 4, name: 'Campus Mug', price: '$9.99' },
        { id: 5, name: 'College Cap', price: '$15.99' },
        { id: 6, name: 'Keychain', price: '$4.99' },
        { id: 7, name: 'Sticker Pack', price: '$5.99' },
        { id: 8, name: 'Notebook', price: '$12.99' },
      ];
  
      // Iterate over each product and verify its details
      products.forEach((product, index) => {
        cy.get('.featured-products-section')
          .find('.product-card')
          .eq(index)
          .within(() => {
            cy.contains(product.name).should('exist');
            cy.contains(product.price).should('exist');
          });
      });
    });
  
    it('should render the Footer component', () => {
      // Check if the Footer component is visible
      cy.get('footer').should('be.visible');
    });
  
    it('should have a responsive design', () => {
      // Test mobile viewport
      cy.viewport('iphone-6');
      cy.get('.home').should('be.visible');
  
      // Test tablet viewport
      cy.viewport('ipad-2');
      cy.get('.home').should('be.visible');
  
      // Test desktop viewport
      cy.viewport(1280, 720);
      cy.get('.home').should('be.visible');
    });
  
    it('should load the background image in the image section', () => {
      // Verify the background image in the image section
      cy.get('.image-section')
        .should('have.css', 'background-image')
        .and('include', 'bg.jpg');
    });
  });
  