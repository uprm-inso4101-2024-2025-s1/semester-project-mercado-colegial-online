<template>
    <div>
      <header class="main-header">
        <h1>Product Listing</h1>
        <div class="nav-buttons">
          <router-link to="/home">
            <img src="../assets/home.png" style="margin: 0px 20px ;" alt=" " width="35" height="35" />
          </router-link>
          <router-link to="/seller-dash">
            <img src="../assets/dashboard.png" style="margin: 0px 20px ;" alt=" " width="35" height="35" />
          </router-link>
        </div>
      </header>
      <section class="search-bar-container">
        <input
          type="text"
          placeholder="Search for products..."
          class="search-bar"
          v-model="searchQuery"
        />
        <button class="search-btn" @click="searchProducts">Search</button>
      </section>
      <div class="categories">
        <h3>Categories</h3>
        <div class="category-options" style="text-align: center;">
          <label v-for="category in categories" :key="category">
            <input type="checkbox" v-model="selectedCategories" :value="category" /> {{ category }}
          </label>
        </div>
      </div>
      <div class="main-content">
        <div class="sidebar" :class="{ collapsed: isSidebarCollapsed }">
          <button class="toggle-btn" @click="toggleSidebar">
            {{ isSidebarCollapsed ? 'Show Filters' : 'Hide Filters' }}
          </button>
          <div v-if="!isSidebarCollapsed">
            <h3>Price Range</h3>
            <input type="range" v-model="priceRange" min="0" max="500" />
            <p>Max Price: ${{ priceRange }}</p>
            <h3>Tags</h3>
            <div v-for="tag in tags" :key="tag">
              <label><input type="checkbox" v-model="selectedTags" :value="tag" /> {{ tag }}</label>
            </div>
            <h3>Rating</h3>
            <input type="range" v-model="rating" min="0" max="5" step="0.1" />
            <p>Min Rating: {{ rating }} stars</p>
          </div>
        </div>
        <div class="product-list">
          <div class="view-toggle">
            <div class="view-options">
              <button @click="setView('grid')" :class="{ active: viewMode === 'grid' }">Grid View</button>
              <button @click="setView('list')" :class="{ active: viewMode === 'list' }">List View</button>
            </div>
            <div>
              <label>Sort By:</label>
              <select v-model="sortOption">
                <option value="price">Price</option>
                <option value="relevance">Relevance</option>
                <option value="date">Date Added</option>
              </select>
            </div>
          </div>
          <div :class="{ grid: viewMode === 'grid', list: viewMode === 'list' }">
            <div
              v-for="product in filteredAndSortedProducts"
              :key="product.id"
              class="product-card"
            >
              <img :src="product.image" :alt="product.name" />
              <h2>{{ product.name }}</h2>
              <p>Price: ${{ product.price }}</p>
              <p>Rating: {{ product.rating }} stars</p>
            </div>
          </div>
          <div class="pagination">
            <button @click="loadMore" v-if="!allLoaded">Load More</button>
            <div v-else>
              <p>No more products to load.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
</template>

<script>
  import Footer from "../components/Footer.vue";

  export default {
    name: "ProductSearch",
    components: {
      Footer,
    },
    data() {
    return {
    searchQuery: '',
    categories: ['Jewelry', 'Clothing', 'Pottery', 'Baked Goods', 'Makeup', 'Crochet Items', 'Thrifted Clothes'],
    selectedCategories: [],
    priceRange: 500,
    tags: ['Handmade', 'Vintage', 'Sustainable'],
    selectedTags: [],
    rating: 0,
    viewMode: 'grid',
    sortOption: 'relevance',
    products: [
          { id: 9, name: 'Handmade Necklace', price: 25, rating: 4.5, category: 'Jewelry', image: 'necklace.jpg', tags: ['Handmade'] },
          { id: 10, name: 'Vintage Dress', price: 40, rating: 4.8, category: 'Clothing', image: 'dress.jpg', tags: ['Vintage'] },
          { id: 11, name: 'Ceramic Mug', price: 15, rating: 4.2, category: 'Pottery', image: 'mug.jpg', tags: ['Handmade'] },
          { id: 12, name: 'Chocolate Chip Cookies', price: 10, rating: 5, category: 'Baked Goods', image: 'cookies.jpg', tags: ['Sustainable'] },
          { id: 13, name: 'Crochet Scarf', price: 30, rating: 4.6, category: 'Crochet Items', image: 'scarf.jpg', tags: ['Handmade'] },
          { id: 14, name: 'Organic Lip Balm', price: 8, rating: 4.9, category: 'Makeup', image: 'lipbalm.jpg', tags: ['Sustainable'] },
          { id: 15, name: 'Thrifted Vintage Jacket', price: 45, rating: 4.7, category: 'Thrifted Clothes', image: 'jacket.jpg', tags: ['Vintage'] },
          { id: 16, name: 'Handmade Pottery Bowl', price: 20, rating: 4.3, category: 'Pottery', image: 'bowl.jpg', tags: ['Handmade'] },
          { id: 17, name: 'Beaded Bracelet', price: 12, rating: 4.4, category: 'Jewelry', image: 'bracelet.jpg', tags: ['Handmade'] },
          { id: 18, name: 'Vintage Handbag', price: 55, rating: 4.8, category: 'Clothing', image: 'handbag.jpg', tags: ['Vintage'] },
          { id: 18, name: 'Artisan Soap', price: 7, rating: 4.1, category: 'Baked Goods', image: 'soap.jpg', tags: ['Handmade'] },
          { id: 19, name: 'Knitted Blanket', price: 80, rating: 4.9, category: 'Crochet Items', image: 'blanket.jpg', tags: ['Handmade'] },
          { id: 20, name: 'Reusable Tote Bag', price: 15, rating: 4.7, category: 'Thrifted Clothes', image: 'tote.jpg', tags: ['Sustainable'] },
          { id: 21, name: 'Vintage Sunglasses', price: 30, rating: 4.6, category: 'Clothing', image: 'sunglasses.jpg', tags: ['Vintage'] },
          { id: 22, name: 'Handmade Candles', price: 22, rating: 4.5, category: 'Baked Goods', image: 'candles.jpg', tags: ['Handmade'] },
          { id: 23, name: 'Handcrafted Wooden Toy', price: 28, rating: 4.3, category: 'Handmade', image: 'toy.jpg', tags: ['Handmade'] },
          { id: 24, name: 'Vintage Phone Case', price: 18, rating: 4.5, category: 'Accessories', image: 'phone_case.jpg', tags: ['Vintage'] },
          { id: 25, name: 'Hand-painted Plant Pot', price: 25, rating: 4.8, category: 'Home Decor', image: 'plant_pot.jpg', tags: ['Handmade'] },
          { id: 26, name: 'Leather Wallet', price: 35, rating: 4.6, category: 'Accessories', image: 'wallet.jpg', tags: ['Handmade'] },
          { id: 27, name: 'Natural Face Cream', price: 20, rating: 4.7, category: 'Skincare', image: 'face_cream.jpg', tags: ['Sustainable'] },
        ],
    loadedProducts: [],
    loadLimit: 10,
    isSidebarCollapsed: false,
    allLoaded: false,
    };
},
computed: {
    filteredAndSortedProducts() {
    let filtered = this.products.filter(product => {
        return (
        (!this.selectedCategories.length || this.selectedCategories.includes(product.category)) &&
        product.price <= this.priceRange &&
        (!this.selectedTags.length || this.selectedTags.some(tag => product.tags.includes(tag))) &&
        product.rating >= this.rating &&
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    });

    if (this.sortOption === 'price') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'date') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered.slice(0, this.loadLimit);
    },
},
methods: {
    toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    setView(mode) {
    this.viewMode = mode;
    },
    loadMore() {
    this.loadLimit += 10;
    if (this.loadLimit >= this.filteredAndSortedProducts.length) {
        this.allLoaded = true;
    }
    },
},
};
</script>
  
<style scoped>
.main-header {
display: flex;
justify-content: space-between;
align-items: center;
padding: 20px;
background-color: #006400;
color: white;
}

.search-bar-container {
display: flex;
justify-content: center;
margin: 20px 0;
}

.search-bar {
    display: flex;
    align-items: center;
    border: 4px solid green;
    border-radius: 16px;
    padding: 10px;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: relative;
    width: 400px;
  }

.search-btn {
  padding: 10px 15px;
  margin-left: 10px;
  background-color: #228B22;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
}

.categories {
margin: 20px;
}

.main-content {
display: flex;
justify-content: space-between;
}

.sidebar {
width: 200px;
border-right: 1px solid #ccc;
padding: 20px;
}

.toggle-btn {
display: block;
margin-bottom: 10px;
}

.product-list {
flex-grow: 1;
padding: 20px;
}

.product-card {
border: 1px solid #ccc;
padding: 10px;
margin: 10px;
border-radius: 5px;
color: black;
}

.grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
gap: 20px;
}

.list {
display: block;
}

.pagination {
text-align: center;
margin-top: 20px;
}

.nav-buttons {
display: flex;
}

.nav-btn {
margin-left: 10px;
padding: 10px;
background-color: #228B22;
color: white;
border: none;
cursor: pointer;
border-radius: 8px;
}

footer {
text-align: center;
color: #252525;
padding: 20px;
background-color: darkgreen;
margin-top: 20px;
}

.active {
background-color: #c7ecc7;
}
</style>
