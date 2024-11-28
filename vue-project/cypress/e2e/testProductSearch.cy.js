// cypress/e2e/product_listing.cy.js

describe('Product Listing Page', () => {
    beforeEach(() => {
      // Replace '/product-listing' with the actual route of your product listing page
      cy.visit('/productSearch');
    });
  
    it('should display the header and navigation buttons', () => {
      cy.get('.main-header').should('be.visible');
      cy.get('.nav-buttons').within(() => {
        cy.get('a[href="/home"]').should('be.visible');
        cy.get('a[href="/seller-dash"]').should('be.visible');
      });
    });
  
    it('should display and operate the search bar', () => {
        // Ensure the search bar container is visible
        cy.get('[data-cy=search-bar-container]').should('be.visible');
      
        // Type 'Necklace' into the search input
        cy.get('[data-cy=search-input]').type('Necklace');
      
        // Click the search button
        cy.get('[data-cy=search-button]').click();
      
        // Verify that the product card containing 'Handmade Necklace' is displayed
        cy.get('[data-cy=product-card]')
          .should('contain', 'Handmade Necklace')
          .and('be.visible');
      });
      
  
    it('should display and filter categories', () => {
      cy.get('.categories').within(() => {
        cy.contains('Categories');
        cy.get('input[type="checkbox"]').should('have.length', 7);
      });
      cy.get('.categories input[value="Jewelry"]').check();
      cy.get('.product-card').should('contain', 'Handmade Necklace');
    });
  
    it('should switch between grid and list views', () => {
      cy.get('.view-toggle button').contains('List View').click();
      cy.get('.product-list').should('have.class', 'list');
      cy.get('.view-toggle button').contains('Grid View').click();
      cy.get('.product-list').should('have.class', 'grid');
    });
  
    it('should sort products by price', () => {
      cy.get('.view-toggle select').select('Price');
      cy.get('.product-card').then(($cards) => {
        const prices = [...$cards].map(card => parseFloat(card.querySelector('p').textContent.replace('Price: $', '')));
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sortedPrices);
      });
    });
  
    it('should load more products when "Load More" is clicked', () => {
      cy.get('.pagination button').click();
      cy.get('.product-card').should('have.length.greaterThan', 10);
    });
  
    it('should display the footer', () => {
      cy.get('footer').should('be.visible');
    });
  });
  