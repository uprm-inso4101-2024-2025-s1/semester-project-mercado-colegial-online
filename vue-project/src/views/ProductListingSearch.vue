<template>
    <div>
      <!-- Header with Search Bar and Promotions Banner -->
      <div class="header">
        <h1>Product Search</h1>
        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="Search products..." />
          <button @click="searchProducts">Search</button>
        </div>
        <div class="promo-banner">
          <p>Don't miss out on our special discounts!</p>
        </div>
      </div>
  
      <!-- CATEGORIES Section -->
      <div class="categories">
        <h3>Categories</h3>
        <div class="category-options" style="text-align: center;">
          <label v-for="category in categories" :key="category">
            <input type="checkbox" v-model="selectedCategories" :value="category" /> {{ category }}
          </label>
        </div>
      </div>
  
      <!-- Main layout: Sidebar and Product Listing -->
      <div class="main-content">
        <!-- Collapsible Filter Sidebar -->
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
  
        <!-- Product Listing with View Options -->
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
  
          <!-- Grid or List View Products -->
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
  
          <!-- Pagination or Load More Button -->
          <div class="pagination">
            <button @click="loadMore" v-if="!allLoaded">Load More</button>
            <div v-else>
              <p>No more products to load.</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Footer -->
      <footer>
        <p>© 2024 Mercado Colegial Online</p>
      </footer>
    </div>
</template>
  
<script>
export default {
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
        { id: 1, name: 'Handmade Necklace', price: 25, rating: 4.5, category: 'Jewelry', image: 'necklace.jpg', tags: ['Handmade'] },
        { id: 2, name: 'Vintage Dress', price: 40, rating: 4.8, category: 'Clothing', image: 'dress.jpg', tags: ['Vintage'] },
        { id: 3, name: 'Ceramic Mug', price: 15, rating: 4.2, category: 'Pottery', image: 'mug.jpg', tags: ['Handmade'] },
        { id: 4, name: 'Chocolate Chip Cookies', price: 10, rating: 5, category: 'Baked Goods', image: 'cookies.jpg', tags: ['Sustainable'] },
        { id: 5, name: 'Crochet Scarf', price: 30, rating: 4.6, category: 'Crochet Items', image: 'scarf.jpg', tags: ['Handmade'] },
        { id: 6, name: 'Organic Lip Balm', price: 8, rating: 4.9, category: 'Makeup', image: 'lipbalm.jpg', tags: ['Sustainable'] },
        { id: 7, name: 'Thrifted Vintage Jacket', price: 45, rating: 4.7, category: 'Thrifted Clothes', image: 'jacket.jpg', tags: ['Vintage'] },
        { id: 8, name: 'Handmade Pottery Bowl', price: 20, rating: 4.3, category: 'Pottery', image: 'bowl.jpg', tags: ['Handmade'] },
        { id: 9, name: 'Beaded Bracelet', price: 12, rating: 4.4, category: 'Jewelry', image: 'bracelet.jpg', tags: ['Handmade'] },
        { id: 10, name: 'Vintage Handbag', price: 55, rating: 4.8, category: 'Clothing', image: 'handbag.jpg', tags: ['Vintage'] },
        { id: 11, name: 'Artisan Soap', price: 7, rating: 4.1, category: 'Baked Goods', image: 'soap.jpg', tags: ['Handmade'] },
        { id: 12, name: 'Knitted Blanket', price: 80, rating: 4.9, category: 'Crochet Items', image: 'blanket.jpg', tags: ['Handmade'] },
        { id: 13, name: 'Reusable Tote Bag', price: 15, rating: 4.7, category: 'Thrifted Clothes', image: 'tote.jpg', tags: ['Sustainable'] },
        { id: 14, name: 'Vintage Sunglasses', price: 30, rating: 4.6, category: 'Clothing', image: 'sunglasses.jpg', tags: ['Vintage'] },
        { id: 15, name: 'Handmade Candles', price: 22, rating: 4.5, category: 'Baked Goods', image: 'candles.jpg', tags: ['Handmade'] },
        { id: 16, name: 'Handcrafted Wooden Toy', price: 28, rating: 4.3, category: 'Handmade', image: 'toy.jpg', tags: ['Handmade'] },
        { id: 17, name: 'Vintage Phone Case', price: 18, rating: 4.5, category: 'Accessories', image: 'phone_case.jpg', tags: ['Vintage'] },
        { id: 18, name: 'Hand-painted Plant Pot', price: 25, rating: 4.8, category: 'Home Decor', image: 'plant_pot.jpg', tags: ['Handmade'] },
        { id: 19, name: 'Leather Wallet', price: 35, rating: 4.6, category: 'Accessories', image: 'wallet.jpg', tags: ['Handmade'] },
        { id: 20, name: 'Natural Face Cream', price: 20, rating: 4.7, category: 'Skincare', image: 'face_cream.jpg', tags: ['Sustainable'] },
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
        product.rating >= this.rating
        );
    });

    if (this.sortOption === 'price') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'relevance') {
    } else if (this.sortOption === 'date') {
    }

    return filtered;
    },
},
methods: {
    searchProducts() {
    },
    toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
    setView(view) {
    this.viewMode = view;
    },
    loadMore() {
    const currentLoadCount = this.loadedProducts.length;
    const newProducts = this.filteredAndSortedProducts.slice(currentLoadCount, currentLoadCount + this.loadLimit);
    this.loadedProducts.push(...newProducts);

    if (newProducts.length < this.loadLimit) {
        this.allLoaded = true;
    }
    },
},
mounted() {
    this.loadMore();
},
};
</script>
  
<style scoped>
/* Styles for the product listing search page */
.header {
text-align: center;
margin: 20px 0;
background-color: #006400; /* Header color same as footer */
color: white; /* Text color in header */
padding: 20px; /* Padding for header */
width: 100%;
}

.search-bar {
display: inline-block;
}

.categories {
text-align: center;
margin: 20px 0;
}

.category-options {
display: flex;
justify-content: center;
flex-wrap: wrap;
}

.main-content {
display: flex;
}

.sidebar {
width: 250px;
border-right: 1px solid #ccc;
background-color: #e6f7e6; /* Background for sidebar */
}

.toggle-btn {
margin-bottom: 10px;
background-color: #228B22; /* Button color */
color: white; /* Button text color */
border: none;
padding: 10px;
cursor: pointer; /* Pointer cursor */
}

.product-list {
flex: 1;
padding: 20px;
}

.view-toggle {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
}

.view-options button {
margin-right: 10px;
background-color: #006400; /* Active button color */
color: white; /* Button text color */
border: none;
padding: 10px;
cursor: pointer; /* Pointer cursor */
}

.product-card {
border: 1px solid #ccc;
padding: 10px;
margin: 10px;
text-align: center;
background-color: white; /* Product card background */
}

.grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.list {
display: block;
}

.pagination {
text-align: center;
margin-top: 20px;
}

footer {
width: 100%;
text-align: center;
padding: 20px;
background-color: #006400; /* Footer background color */
color: white; /* Footer text color */
}
</style>  