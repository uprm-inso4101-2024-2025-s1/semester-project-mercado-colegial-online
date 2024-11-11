<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a href="/" class="brand-name">
        <span class="mercado">Mercado </span>
        <span class="colegial">Colegial</span>
      </a>
    </div>
    <div :class="['navbar-menu', { 'is-active': menuActive }]">
      <router-link to="/Home" class="nav-item">
        <img src="../assets/home.png" alt=" " width="35" height="35" />
      </router-link>
      <router-link to="/productSearch" class="nav-item">
        <img src="../assets/products.png" alt=" " width="35" height="35" />
      </router-link>
      <router-link to="/Profile" class="nav-item">
          <img src="../assets/accountAvatar.png" alt=" " width="35" height="35" />
      </router-link>
      <router-link to="/Cart" class="nav-item">
          <img src="../assets/shopping.png" alt=" " width="35" height="35" />
      </router-link>
    </div>
  </nav>
</template>
  
  <script>
  export default {
    name: "Navbar",
  };
  </script>
  
  <style scoped>
  .navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 20px 20px;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* High z-index to stay on top of other elements */
}

  
  .navbar-brand .brand-name {
    font-size: 34px;
    font-weight: bold;
    text-decoration: none;
  }
  
  .mercado {
    color: darkgreen;
    font-weight: bold;
  }
  
  .colegial {
    color: darkgreen;
    font-weight: bold;
  }
  
  .navbar-menu {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
  }
  
  .nav-item {
    margin-left: 20px;
    margin-right: 20px;
    text-decoration: none;
    color: #1E8A0D;
    font-size: 16px;
    font-weight: 500;
    font-weight: bold;
  }
  
  .nav-item:hover {
    color: darkgreen;
  }
  
  /* Ensures no horizontal overflow */
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  </style>
  