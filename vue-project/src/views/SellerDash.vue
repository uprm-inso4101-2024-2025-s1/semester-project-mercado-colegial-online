<template>
  <div>
    <div class="header">
      <h1>Seller Dashboard</h1>
      <div>
        <router-link to="/home">
          <img src="../assets/home.png" style="margin: 0px 20px ;" alt=" " width="35" height="35" />
        </router-link>
        <router-link to="/ProductSearch">
          <img src="../assets/products.png" style="margin: 0px 20px ;" alt=" " width="35" height="35" />
        </router-link>
      </div>
    </div>

    <div class="tabs">
      <button
        :class="{ active: activeTab === 'all-products' }"
        @click="showTab('all-products')"
      >All Products</button>
      <button
        :class="{ active: activeTab === 'listed-products' }"
        @click="showTab('listed-products')"
      >Listed</button>
      <button
        :class="{ active: activeTab === 'sold-products' }"
        @click="showTab('sold-products')"
      >Sold</button>
      <button
        :class="{ active: activeTab === 'draft-products' }"
        @click="showTab('draft-products')"
      >Drafts</button>
    </div>

    <div class="content">
      <div v-if="activeTab === 'all-products'">
        <h2>All Products</h2>
        <div class="statistics">
          <h3>Overall Statistics</h3>
          <p>Total Products: 100</p>
          <p>Total Sales: $5,000</p>
          <p>Average Price: $50</p>
        </div>
        <table class="product-history">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in allProducts" :key="product.name">
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.status }}</td>
              <td>{{ product.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="activeTab === 'listed-products'">
        <h2>Listed Products</h2>
        <div class="statistics">
          <h3>Listed Product Statistics</h3>
          <p>Total Listed Products: 50</p>
          <p>Average Listed Price: $30</p>
        </div>
        <table class="product-history">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Date Listed</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in listedProducts" :key="product.name">
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.dateListed }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="activeTab === 'sold-products'">
        <h2>Sold Products</h2>
        <div class="statistics">
          <h3>Sold Product Statistics</h3>
          <p>Total Sold Products: 30</p>
          <p>Total Revenue: $1,500</p>
        </div>
        <table class="product-history">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Date Sold</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in soldProducts" :key="product.name">
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.dateSold }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="activeTab === 'draft-products'">
        <h2>Draft Products</h2>
        <div class="statistics">
          <h3>Draft Product Statistics</h3>
          <p>Total Draft Products: 20</p>
          <p>Potential Revenue: $600</p>
        </div>
        <table class="product-history">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Date Added to Draft</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in draftProducts" :key="product.name">
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.dateAdded }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <footer>
      <p>© 2024 Mercado Colegial Online</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'all-products',
      allProducts: [
        { name: 'Handmade Necklace', category: 'Jewelry', price: '$25.00', status: 'Listed', date: '2024-09-01' },
        { name: 'Vintage Dress', category: 'Clothing', price: '$40.00', status: 'Sold', date: '2024-09-02' },
        { name: 'Prototype Pottery', category: 'Pottery', price: '$35.00', status: 'Draft', date: '2024-09-07' },
      ],
      listedProducts: [
        { name: 'Handmade Necklace', category: 'Jewelry', price: '$25.00', dateListed: '2024-09-01' },
        { name: 'Vintage Dress', category: 'Clothing', price: '$40.00', dateListed: '2024-09-02' },
      ],
      soldProducts: [
        { name: 'Handmade Necklace', category: 'Jewelry', price: '$25.00', dateSold: '2024-09-05' },
        { name: 'Vintage Dress', category: 'Clothing', price: '$40.00', dateSold: '2024-09-06' },
      ],
      draftProducts: [
        { name: 'Prototype Pottery', category: 'Pottery', price: '$35.00', dateAdded: '2024-09-07' },
        { name: 'Banana Nut Bread', category: 'Baked Goods', price: '$15.00', dateAdded: '2024-09-08' },
      ]
    }
  },
  methods: {
    showTab(tabName) {
      this.activeTab = tabName;
    },
    navigateTo(page) {
      this.$router.push({ path: `/${page}.html` });
    }
  },
  mounted() {
    this.showTab('all-products');
  }
}
</script>

<style scoped>
/* Include the same styles as in the HTML file */
body {
  font-family: 'Helvetica', sans-serif;
  margin: 0;
  padding: 0;
  color: #000;
  background-color: #f4fdf4; /* Lightest green for the background */
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #485E3C; /* Dark green */
  color: #fff;
  border-bottom: 2px solid #485E3C; /* Forest green border */
}
.header h1 {
  margin: 0;
}
.header button {
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid #228B22; /* Forest green border */
  background-color: #fff;
  color: #228B22; /* Forest green text */
  margin-left: 10px;
  border-radius: 8px; /* Rounded corners */
}
.header button:hover {
  background-color: #c7ecc7; /* Lighter green on hover */
}
.tabs {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.tabs button {
  padding: 10px 20px;
  background: none;
  border: none;
  color: #006400; /* Dark green text */
  cursor: pointer;
  margin: 0 15px; /* Adds space between tabs */
  font-size: 16px;
  position: relative; /* To position the underline */
}
.tabs button::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background-color: #006400; /* Dark green underline */
  bottom: -5px;
  left: 0;
  transition: width 0.3s ease;
}
.tabs button.active::after {
  width: 100%; /* Full width underline when active */
}
.content, .statistics {
  margin: 20px;
}
.statistics {
  border: 1px solid #006400; /* Dark green border */
  padding: 20px;
  text-align: center;
  background-color: #e6f7e6; /* Very light green */
}
footer {
  text-align: center;
  padding: 10px;
  background-color: #485E3C; /* Dark green */
  color: #252525;
  border-top: 2px solid #485E3C; /* Forest green border */
  position: fixed;
  width: 100%;
  bottom: 0;
}
.product-history {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
.product-history th, .product-history td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.product-history th {
  background-color: #c7ecc7; /* Lighter green for table headers */
}
</style>