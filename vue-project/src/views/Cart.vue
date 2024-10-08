<template>
    <div class="cart-page">
      <Navbar />
      <h1>Your Cart</h1>
      <div class="cart-content">
        
        <div class="cart-items">
          <div class="cart-item" v-for="(product, index) in products" :key="index">
            <img :src="product.image" alt="Product Image" class="product-image" />
            <div class="item-info">
              <h3>{{ product.name }}</h3>
              <p>Seller: {{ product.seller }}</p>
              <p>Cost: ${{ product.price }}</p>
            
              <p class="item-quantity">Quantity: <strong>{{ product.quantity }}</strong></p>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(index)" :disabled="product.quantity <= 1" class="quantity-button">-</button>
              <span>{{ product.quantity }}</span>
              <button @click="increaseQuantity(index)" class="quantity-button">+</button>
            </div>

            <button @click="removeProduct(index)" class="remove-button">Remove</button>
          </div>
        </div>
      </div>
        
        <div class="cart-summary">
          <h2>Order Summary</h2>
          <h3>Total: ${{ totalAmount }}</h3>
          <button class="checkout-button">Proceed to Checkout</button>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
  
  export default {
    name: "CartPage",
    components: {
      Navbar,
      Footer,
    },
    data() {
      return {
        products: [
        { id: 1, name: "Custom T-shirt", price: 19.99, seller: "SHOP123", quantity: 1},
        { id: 2, name: "RUM Lanyard", price: 19.99, seller: "SHOP123", quantity: 1},
        { id: 3, name: "UPRM Hoodie", price: 19.99, seller: "SHOP123", quantity: 1},
        { id: 4, name: "Campus Mug", price: 9.99, seller: "SHOP123", quantity: 1},
        { id: 5, name: "College Cap", price: 15.99, seller: "SHOP123", quantity: 1},
        { id: 6, name: "Keychain", price: 4.99, seller: "SHOP123", quantity: 1},
        { id: 7, name: "Sticker Pack", price: 5.99, seller: "SHOP123", quantity: 1},
        { id: 8, name: "Notebook", price: 12.99, seller: "SHOP123", quantity: 1},
        ],
        
      };
    },
    computed: {
        totalAmount() {
      return this.products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    },
    totalQuantity() {
      return this.products.reduce((total, product) => total + product.quantity, 0);
    },
  },
    methods:{
        

    // Increase quantity method
    increaseQuantity(index) {
      this.products[index].quantity += 1;
      this.calculateTotal(); // Recalculate total after increasing quantity
    },

    // Decrease quantity method
    decreaseQuantity(index) {
      if (this.products[index].quantity > 1) {
        this.products[index].quantity -= 1;
        this.calculateTotal(); // Recalculate total after decreasing quantity
      }
    },

    // Remove product from cart
    removeProduct(index) {
      this.products.splice(index, 1); // Remove product from cart
      this.calculateTotal(); // Recalculate total after removing product
    }
    },

    
  };
  </script>
  
  <style scoped>
/* General layout */
.cart-page {
  padding: 20px;
  margin-top: 35px; /* Adjusted margin for the navbar */
  font-family: 'Arial', sans-serif;
}

.cart-title {
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

/* Cart content layout */
.cart-content {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

/* Left column: Cart items */
.cart-items {
  flex: 2;
  margin-right: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cart-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 8px;
}

.item-info h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.item-info p {
  margin: 5px 0;
  color: #777;
}

.item-price {
  font-weight: bold;
  color: #2c9b39;
}

/* Right column: Checkout Summary */
.cart-summary {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart-summary h3 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.checkout-button {
  background-color: #28a745;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

.checkout-button:hover {
  background-color: #218838;
}

.checkout-button:active {
  background-color: #1e7e34;
}
/* Quantity Controls */
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.quantity-button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.quantity-button:hover {
  background-color: #45a049;
  transform: scale(1.1); /* Slightly enlarge the button on hover */
}

.quantity-button:disabled {
  cursor: not-allowed;
  background-color: #ccc;
}

.quantity-button:disabled:hover {
  background-color: #ccc;
  transform: none;
}

.quantity-button span {
  font-size: 24px;
  font-weight: bold;
}

/* Remove button */
.remove-button {
  margin-top: 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.remove-button:hover {
  background-color: #e04343;
  transform: scale(1.05); /* Slightly enlarge on hover */
}

.remove-button:active {
  background-color: #c0392b;
}

.remove-button:focus {
  outline: none;
}
/* Responsive design */
@media (max-width: 768px) {
  .cart-content {
    flex-direction: column;
  }

  .cart-items {
    margin-right: 0;
  }
}
</style>