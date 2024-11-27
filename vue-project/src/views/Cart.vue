<template>
  <div class="cart-page">
    <Navbar />
    <!-- Cart Title -->
    <h1 class="cart-title">Cart</h1>

    <!-- Select All -->
    <div class="select-all-wrapper">
      <label class="select-all-label">
        <input
          type="checkbox"
          class="select-all-checkbox"
          :checked="allSelected"
          @change="toggleSelectAll"
        />
        Select All
      </label>
    </div>

    <!-- Cart Items -->
    <div class="cart-items">
      <div
        class="cart-item"
        v-for="(product, index) in products"
        :key="product.id"
      >
        <!-- Left Section: Image -->
        <div class="product-image"></div>

        <!-- Right Section: Product Details -->
        <div class="item-info">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p>Seller: {{ product.seller }}</p>
        </div>

        <!-- Bottom Section: Price, Quantity, and Selected Button -->
        <div class="bottom-section">
          <div class="quantity-controls">
            <button class="minus" @click="decreaseQuantity(index)">-</button>
            <span class="quantity-display">{{ product.quantity }}</span>
            <button class="plus" @click="increaseQuantity(index)">+</button>
          </div>
          <label class="selected-checkbox-label">
            <input
              type="checkbox"
              class="selected-checkbox"
              v-model="product.selected"
            />
            Selected
          </label>
          <p class="item-price">Price: ${{ product.price }}</p>
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <div class="footer-content">
      <div class="subtotal-summary">
        <h3>Subtotal: ${{ totalAmount }}</h3>
        <p>Items: {{ totalQuantity }}</p>
      </div>
      <button class="checkout-button" @click="proceedToCheckout">Checkout</button>
    </div>

    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "CartPage",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Custom T-shirt",
          description: "A high-quality, comfortable custom T-shirt made from breathable material.",
          price: 19.99,
          seller: "SHOP123",
          quantity: 1,
          selected: true,
        },
        {
          id: 2,
          name: "RUM Lanyard",
          description: "Durable and stylish lanyard perfect for holding your ID or keys.",
          price: 19.99,
          seller: "SHOP123",
          quantity: 1,
          selected: true,
        },
        {
          id: 3,
          name: "UPRM Hoodie",
          description: "A cozy hoodie with a UPRM design, ideal for chilly days on campus.",
          price: 19.99,
          seller: "SHOP123",
          quantity: 1,
          selected: true,
        },
        {
          id: 4,
          name: "Campus Mug",
          description: "A ceramic mug featuring campus branding, perfect for coffee or tea.",
          price: 9.99,
          seller: "SHOP123",
          quantity: 1,
          selected: true,
        },
        {
          id: 5,
          name: "College Cap",
          description: "A classic college cap with adjustable sizing and embroidered logo.",
          price: 15.99,
          seller: "SHOP123",
          quantity: 1,
          selected: true,
        },
        {
          id: 6,
          name: "Keychain",
          description: "A sleek keychain with a polished finish and engraved campus logo.",
          price: 4.99,
          seller: "SHOP123",
          quantity: 1,
          selected: true,
        },
        {
          id: 7,
          name: "Sticker Pack",
          description: "A pack of vibrant stickers featuring campus logos and designs.",
          price: 5.99,
          seller: "SHOP123",
          quantity: 1,
          selected: true,
        },
        {
          id: 8,
          name: "Notebook",
          description: "A durable notebook with lined pages, perfect for lectures and notes.",
          price: 12.99,
          seller: "SHOP123",
          quantity: 1,
          selected: true,
        },
      ],
    };
  },
  computed: {
    totalAmount() {
      return this.products
        .filter((product) => product.selected)
        .reduce((total, product) => total + product.price * product.quantity, 0)
        .toFixed(2);
    },
    totalQuantity() {
      return this.products
        .filter((product) => product.selected)
        .reduce((total, product) => total + product.quantity, 0);
    },
    allSelected() {
      return this.products.every((product) => product.selected);
    },
  },
  methods: {
    increaseQuantity(index) {
      this.products[index].quantity++;
    },
    decreaseQuantity(index) {
      if (this.products[index].quantity > 1) {
        this.products[index].quantity--;
      } else {
        // Remove product if quantity is 1
        this.products.splice(index, 1);
      }
    },
    toggleSelectAll() {
      const newValue = !this.allSelected;
      this.products.forEach((product) => (product.selected = newValue));
    },
    proceedToCheckout() {
      alert("Proceeding to checkout!");
    },
  },
};
</script>

<style scoped>
.cart-page {
  font-family: Arial, sans-serif;
  max-width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 100px;
}

.cart-title {
  font-size: 28px;
  font-weight: bold;
  color: #000;
  margin-bottom: 20px;
  text-align: left;
}

.select-all-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.select-all-label {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  gap: 10px;
}

.select-all-checkbox {
  appearance: none;
  width: 24px;
  height: 24px;
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  position: relative;
}

.select-all-checkbox:checked {
  background-color: #536C44;
  border-color: #536C44;
}

.select-all-checkbox:checked::after {
  content: "✔";
  position: absolute;
  color: #fff;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  width: 24px;
  height: 24px;
  top: 0;
  left: 0;
}

.cart-items {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
}

.product-image {
  width: 400px;
  height: 300px;
  background-color: #ccc;
  border-radius: 10px;
  margin-right: 20px;
}

.item-info h3 {
  margin: 4px 0;
}

.item-info p {
  margin: 20px 0;
}

.bottom-section {
  display: flex;
  align-items: center; /* Ensure vertical alignment */
  justify-content: space-between; /* Distribute items evenly with no overflow */
  gap: 0%; /* Add spacing between elements */
  flex-wrap: wrap; /* Allow items to wrap if the page gets too narrow */
  width: 100%; /* Ensure it takes the full width of the container */
  margin-top: auto;
  margin-left: -100px;
}

.quantity-controls {
  display: flex;
}

.quantity-controls button {
  background-color: #536C44;
  color: #fff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  width: 40px; /* Consistent size */
  height: 35px;
}

.quantity-controls button.minus {
  border-radius: 8px 0px 0px 8px; 
}

.quantity-controls button.plus {
  border-radius: 0px 8px 8px 0px; 
}

.quantity-controls button:hover {
  background-color: #435739;
}


.quantity-controls button:hover {
  background-color: #435739;
}

.quantity-display {
  display: inline-block;
  text-align: center;
  background-color: #536C44;
  color: #fff;
  border: 0px solid #ddd;
  padding: 10px;
  width: 30px; /* Matches the button width */
  height: 15px;
  font-size: 16px;
}

.item-price {
  font-size: 16px;
  font-weight: bold;
  color: #536C44;

}

.selected-checkbox-label {
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 5px;
  margin-right: 200px;
  margin-left: 200px;
}

.selected-checkbox {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #536C44;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.selected-checkbox:checked {
  background-color: #536C44;
  border-color: #536C44;
}

.selected-checkbox:checked::after {
  content: "✔";
  color: #fff;
  font-size: 14px;
  display: block;
  text-align: right;
}

.footer-content {
  margin-top: auto;
  text-align: center;
}

.checkout-button {
  background-color: #536C44;
  color: white;
  padding: 15px 40px;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: 20px;
  display: block;
  width: 60%;
}

.checkout-button:hover {
  background-color: #435739;
}
</style>
