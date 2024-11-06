<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search"
      @input="onSearchInput"
      @keyup.enter="search"
    />
    <button @click="search">
      <img src="../assets/search.png" alt="Search" class="search-icon" />
    </button>
    <ul v-if="filteredItems.length > 0" class="dropdown">
      <li v-for="(item, index) in filteredItems" :key="index" @click="goToItem(item)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>





  <script>
  export default {
    name: "SearchBar",
    data() {
      return {
        searchQuery: "",
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
        filteredItems: [],
      };
    },
    methods: {
      onSearchInput() {
        if (this.searchQuery) {
          this.filteredItems = this.products.filter(product =>
            product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        } else {
          this.filteredItems = [];
        }
      },
      search() {
        if (this.searchQuery) {
          console.log("Searching for:", this.searchQuery);
        } else {
          this.$router.push("/productSearch");
        }
      },
      goToItem(item) {
        // Navigate to the specific product page
        this.$router.push(`/product/${item.id}`);
        
      },
    },
  };
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    align-items: center;
    border: 4px solid #80A16A;
    border-radius: 16px;
    padding: 10px;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .search-bar input {
    border: none;
    outline: none;
    padding: 5px 10px;
    font-size: 16px;
    flex: 1;
    border-radius: 30px;
  }
  
  .search-bar button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
  }
  
  .search-icon {
    width: 23px;
    height: 23px;
    margin-right: 10px;
  }
  
  .search-bar button:hover {
    background-color: transparent;
  }
  
  .dropdown {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
    z-index: 100;
  }
  
  .dropdown li {
    padding: 10px;
    cursor: pointer;
  }
  
  .dropdown li:hover {
    background-color: #f0f0f0;
  }
  </style>
  





