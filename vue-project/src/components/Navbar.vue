<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a href="/" class="brand-name">
        <span class="mercado">Mercado </span>
        <span class="colegial">Colegial</span>
      </a>
      <button class="hamburger" @click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
    <div :class="['navbar-menu', { 'is-active': menuActive }]">
      <router-link to="/Home" class="nav-item">Home</router-link>
      <router-link to="/productSearch" class="nav-item">Products</router-link>
      <router-link to="/" class="nav-item">Profile</router-link>
      <router-link to="/Cart" class="nav-item">Cart</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      menuActive: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },
  },
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
  z-index: 10;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.brand-name {
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
  transition: max-height 0.3s ease;
}

.nav-item {
  margin-left: 20px;
  margin-right: 20px;
  text-decoration: none;
  color: #1E8A0D;
  font-size: 16px;
  font-weight: bold;
}

.nav-item:hover {
  color: black;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: #1E8A0D;
  margin: 4px 0;
  transition: 0.4s;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .navbar-menu {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    max-height: 0;
    overflow: hidden;
  }
  
  .navbar-menu.is-active {
    max-height: 300px; /* Adjust as needed */
  }

  .nav-item {
    margin: 10px 0;
    text-align: center;
  }

  .hamburger {
    display: flex;
  }
}
</style>
