<template>
    <nav class="navbar">
      <div class="navbar-brand">
        <a href="/" class="brand-name">
          <span class="mercado">Mercado </span>
          <span class="colegial">Colegial</span>
        </a>
      </div>
      <div class="navbar-menu">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/" class="nav-item">Products</router-link>
        <router-link to="/" class="nav-item">Profile</router-link>
        <router-link to="/" class="nav-item">Cart</router-link>
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
    box-sizing: border-box; /* Ensures padding is included in width calculations */
    position: fixed; /* Keep navbar fixed to the top */
    top: 0;
    left: 0;
    right: 0;
  }
  
  .navbar-brand .brand-name {
    font-size: 34px;
    font-weight: bold;
    text-decoration: none;
  }
  
  .mercado {
    color: #1E8A0D;
    font-weight: bold;
  }
  
  .colegial {
    color: #1E8A0D;
    font-weight: normal;
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
    color: black;
  }
  
  /* Ensures no horizontal overflow */
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  </style>
  