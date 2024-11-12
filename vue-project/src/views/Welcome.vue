<template>
  <div class="welcome-container">
    <div class="content-box">
      <div class="header">
        <h1 class="title">
          <span class="mercado">Mercado</span><br />
          <span class="colegial">Colegial</span>
        </h1>
      </div>
      <div class="main-content">
        <p class="description">
          Welcome to the official web platform of Mercado Colegial at UPR Mayagüez! Discover a vibrant marketplace where
          our talented community brings the campus to life with unique products, all in one place. Whether you’re
          looking for handcrafted goods, delicious treats, or exclusive campus merch, explore the best of what our
          student entrepreneurs have to offer—now available online!
        </p>
        <div class="button-group">
          <router-link to="/login">
            <button class="btn login">Seller</button>
          </router-link>
          <p class="or-text">or</p>
          <router-link to="/registration">
            <button class="btn sign-up">Client</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomePage",
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Jersey+25&display=swap');


.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #00a600;
  padding: 2vh;
  box-sizing: border-box;
}


.content-box {
  background-color: #ffffff;
  padding: 3vh;
  width: 90%;
  max-width: 5000px;
  height: 90%;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
}

.header {
  position: absolute;
  top: 15%;
  left: 6%;
}

.title {
  font-size: 5vw; 
  font-weight: bold;
  margin: 0;
  color: #000000;
  font-family: 'Jersey 25', sans-serif; 
  text-align: left;
  line-height: 0.6;
}

.mercado {
  display: block;
}

.colegial {
  display: block;
  color: #00a600;
}

.main-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding-top: 15vh;
  box-sizing: border-box;
  padding-left: 3%; 
}

.description {
  font-size: 2.5vh;
  font-style: italic;
  color: #333333;
  line-height: 1.75;
  max-width: 60%;
}

.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 15%; 
}

.or-text {
  font-size: 2vh; 
  font-weight: bold; 
  margin: 0.5rem 0;
  color: #333333;
}

.btn {
  background-color: #000000;
  color: #ffffff;
  border: none;
  padding: 1vh 2vw;
  font-size: 2vh; 
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  margin: 1vh 0;
  width: 10vw;
  text-align: center;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #333333;
}
</style>