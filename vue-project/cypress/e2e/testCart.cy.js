// cypress/e2e/cart_page.cy.js

describe('Shopping Cart Page', () => {
    beforeEach(() => {
      // Replace '/cart' with the actual route of your cart page
      cy.visit('/Cart');
    });
  
    it('should display the cart title', () => {
      cy.get('.cart-title').should('be.visible').and('contain', 'Cart');
    });
  
    it('should display all cart items with correct details', () => {
        // Ensure the correct number of cart items are displayed
        cy.get('.cart-item').should('have.length', 8); // Update this number based on the actual number of products
      
        // Define the expected products array
        const expectedProducts = [
          { name: 'Custom T-shirt', price: 'Price: $19.99', quantity: '1' },
          { name: 'RUM Lanyard', price: 'Price: $19.99', quantity: '1' },
          { name: 'UPRM Hoodie', price: 'Price: $19.99', quantity: '1' },
          { name: 'Campus Mug', price: 'Price: $9.99', quantity: '1' },
          { name: 'College Cap', price: 'Price: $15.99', quantity: '1' },
          { name: 'Keychain', price: 'Price: $4.99', quantity: '1' },
          { name: 'Sticker Pack', price: 'Price: $5.99', quantity: '1' },
          { name: 'Notebook', price: 'Price: $12.99', quantity: '1' },
        ];
      
        // Iterate over each cart item and verify its details
        cy.get('.cart-item').each(($el, index) => {
          const expectedProduct = expectedProducts[index];
      
          cy.wrap($el).within(() => {
            // Check the product name
            cy.get('.item-info h3').should('contain', expectedProduct.name);
      
            // Check the product price
            cy.get('.item-price').should('contain', expectedProduct.price);
      
            // Check the product quantity
            cy.get('.quantity-display').should('contain', expectedProduct.quantity);
          });
        });
      });
      
  
    it('should increase and decrease product quantity', () => {
      cy.get('.cart-item').first().within(() => {
        cy.get('.quantity-display').should('contain', '1');
        cy.get('.plus').click();
        cy.get('.quantity-display').should('contain', '2');
        cy.get('.minus').click();
        cy.get('.quantity-display').should('contain', '1');
      });
    });
  
    it('should select and deselect all products', () => {
      cy.get('.select-all-checkbox').check();
      cy.get('.cart-item .selected-checkbox').each(($el) => {
        cy.wrap($el).should('be.checked');
      });
      cy.get('.select-all-checkbox').uncheck();
      cy.get('.cart-item .selected-checkbox').each(($el) => {
        cy.wrap($el).should('not.be.checked');
      });
    });
  
    it('should calculate subtotal and total items correctly', () => {
      cy.get('.subtotal-summary h3').should('contain', 'Subtotal: $');
      cy.get('.subtotal-summary p').should('contain', 'Items: 8'); // Assuming all items are selected
    });
  
    it('should proceed to checkout', () => {
      cy.get('.checkout-button').click();
      // Add assertions to verify navigation to the checkout page
    });
  });
  