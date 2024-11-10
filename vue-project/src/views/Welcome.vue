<template>
  <body>
    <h1 class="title">Mercado Colegial</h1>
    <div class="buttons">
      <router-link to="/login">
        <button class="btn Login">Log In</button>
      </router-link>
      <router-link to="/registration">
        <button class="btn vendedor">Sign Up </button>
      </router-link>
    </div>
  </body>
</template>

<script>
export default {
  name: "Welcome",
};
</script>

<style scoped>
body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-left: 20%;
  background-color: rgb(73, 95, 60);
  font-family: Arial, sans-serif;
}

/* .welcome-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-left: 20%;
  background-color: white;
} */

.title {
  font-size: 3em;
  color: rgb(105, 238, 85);
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
  color: hsl(0, 0%, 85%);
  background-color: green;
  border: 3px solid #495F3C;
  border-radius: 10px;
  cursor: pointer;
}

.btn:hover {
  background-color: #495F3C;
  border: 3px solid green;
}
</style>
