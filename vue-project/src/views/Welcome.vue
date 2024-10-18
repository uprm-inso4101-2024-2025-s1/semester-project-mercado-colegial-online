<template>
  <div class="welcome-container">
    <h1 class="title">Mercado Colegial</h1>
    <div class="buttons">
      <router-link to="/login">
        <button class="btn Login">Iniciar sesión</button>
      </router-link>
      <router-link to="/signup">
        <button class="btn vendedor">Registrarse </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
};
</script>

<style scoped>
body {
  background-color: white;
  color: black;
  font-family: Arial, sans-serif;
}

.welcome-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-left: 20%;
  background-color: white;
}

.title {
  font-size: 3em;
  color: green;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: green;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: darkgreen;
}
</style>
