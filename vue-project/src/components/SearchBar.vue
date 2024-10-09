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
  border-radius: 8px;
  padding: 8px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  width: 100%;
  margin: auto;
}

.search-bar input {
  border: none;
  outline: none;
  padding: 8px;
  font-size: 16px;
  flex: 1;
  border-radius: 4px;
}

.search-bar button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  display: flex;
  align-items: center;
}

.search-icon {
  width: 20px;
  height: 20px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .search-bar {
    padding: 6px;
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar input {
    font-size: 14px;
    padding: 6px;
    margin-bottom: 8px;
  }

  .search-bar button {
    align-self: flex-end;
  }

  .search-icon {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 480px) {
  .search-bar {
    padding: 4px;
  }

  .search-bar input {
    padding: 4px;
    font-size: 14px;
  }

  .search-icon {
    width: 16px;
    height: 16px;
  }
}
</style>
