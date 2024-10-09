<template>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search" />
      <button @click="search">
        <router-link to="/productSearch" class="nav-item"><img src="../assets/search.png" alt="Search" class="search-icon" /></router-link>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "SearchBar",
    data() {
      return {
        searchQuery: "",
      };
    },
    methods: {
      search() {
        console.log("Searching for:", this.searchQuery);
      },
    },
  };
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    align-items: center;
    border: 2px solid green;
    border-radius: 16px;
    padding: 10px;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
    background-color: transparent; /* Make background transparent */
    border: none;
    cursor: pointer;
    padding: 0; /* Remove padding for a clean look */
    display: flex;
    align-items: center;
  }
  
  .search-icon {
    width: 20px; /* Adjust the size of the PNG icon */
    height: 20px; /* Adjust the size of the PNG icon */
    margin-right: 10px;
  }
  
  .search-bar button:hover {
    background-color: transparent; /* No hover background change */
  }
  </style>
  