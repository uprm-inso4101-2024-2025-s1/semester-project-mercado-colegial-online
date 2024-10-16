<template>
    <div class="client-container">
      <h1 class="title">Mercado Colegial</h1>
  
      <!-- Login Form -->
      <div class="logIn">
        <form @submit.prevent="login">
          <div class="form">
            <div class="formElement">
              <label for="email">Email:</label>
              <input v-model="email" type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div class="formElement">
              <label for="password">Password:</label>
              <input v-model="password" type="password" id="password" placeholder="Enter your password" required />
            </div>
            <div class="formElement">
              <router-link to="/home">
                <button class="btn" type="submit">Login</button>
              </router-link>
            </div>
          </div>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
  
      <!-- First-Time Joiners Form -->
      <div class="signUp">
        <h2 class="subtitle">First Time Here? Join Now</h2>
        <form @submit.prevent="signUp">
          <div class="form">
            <div class="formElement">
              <label for="firstName">First Name:</label>
              <input v-model="firstName" type="text" id="firstName" placeholder="Enter your first name" required />
            </div>
            <div class="formElement">
              <label for="lastName">Last Name:</label>
              <input v-model="lastName" type="text" id="lastName" placeholder="Enter your last name" required />
            </div>
            <div class="formElement">
              <label for="institutionalEmail">Institutional Email:</label>
              <input v-model="institutionalEmail" type="email" id="institutionalEmail" placeholder="Enter your institutional email" required />
            </div>
            <div class="formElement">
              <label for="studentNumber">Student Number:</label>
              <input v-model="studentNumber" type="text" id="studentNumber" placeholder="Enter your student number" required />
            </div>
            <div class="formElement">
              <label for="signUpPassword">Password:</label>
              <input v-model="signUpPassword" type="password" id="signUpPassword" placeholder="Create a password" required />
            </div>
  
            <!-- CAPTCHA Section -->
            <div class="formElement">
              <label for="captchaInput">Enter the CAPTCHA:</label>
              <canvas id="captchaCanvas" width="100" height="40"></canvas>
              <input v-model="captchaInput" type="text" id="captchaInput" placeholder="Enter CAPTCHA" required />
              <p v-if="captchaError" class="error">{{ captchaError }}</p>
            </div>
  
            <div class="formElement">
              <button class="btn" type="submit">Join Now</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ClientLogIn",
    data() {
      return {
        email: "",
        password: "",
        errorMessage: "",
        firstName: "",
        lastName: "",
        institutionalEmail: "",
        studentNumber: "",
        signUpPassword: "",
        captcha: "", // Stores generated CAPTCHA
        captchaInput: "", // Stores user's CAPTCHA input
        captchaError: "", // Displays CAPTCHA error
      };
    },
  
    methods: {
      login() {
        if (!this.email || !this.password) {
          this.errorMessage = "Both fields are required.";
          return;
        }
        if (this.email === "test@example.com" && this.password === "password123") {
          this.errorMessage = "";
          alert("Login successful!");
        } else {
          this.errorMessage = "Invalid email or password.";
        }
      },
  
      signUp() {
        if (!this.firstName || !this.lastName || !this.institutionalEmail || !this.studentNumber || !this.signUpPassword) {
          this.errorMessage = "All fields are required to sign up.";
          return;
        }
  
        // Validate CAPTCHA input
        if (this.captchaInput !== this.captcha) {
          this.captchaError = "Incorrect CAPTCHA. Please try again.";
          this.refreshCaptcha();
          return;
        }
  
        alert(`Welcome, ${this.firstName}! Your account has been created.`);
      },
  
      // Generate a new CAPTCHA
      generateCaptcha() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let captcha = "";
        for (let i = 0; i < 6; i++) {
          captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        this.captcha = captcha;
  
        // Render the CAPTCHA on the canvas
        const canvas = document.getElementById("captchaCanvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous CAPTCHA
        ctx.font = "20px Arial";
        ctx.fillStyle = "green";
        ctx.fillText(this.captcha, 10, 30); // Draw the CAPTCHA string
      },
  
      // Refresh the CAPTCHA (generate a new one)
      refreshCaptcha() {
        this.generateCaptcha();
      },
    },
  
    mounted() {
      this.generateCaptcha(); // Generate CAPTCHA when the component mounts
    },
  };
  </script>
  
  <style scoped>
  body {
    color: black;
    font-family: Arial, sans-serif;
  }
  
  .title {
    font-size: 3em;
    color: green;
    margin: 0px;
  }
  
  .subtitle {
    font-size: 2em;
    color: green;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  .client-container {
    margin: 10px;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-bottom: 20px;
    height: auto;
  }
  
  .formElement {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    align-items: center;
  }
  
  .btn {
    padding: 5px 10px;
    font-size: 1em;
    color: white;
    background-color: green;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: darkgreen;
  }
  
  label {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 1em;
    color: green;
  }
  
  input {
    font-size: 1em;
    border: 2px solid darkgreen;
    border-radius: 10px;
    padding: 5px;
    width: 100%;
    max-width: 300px;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  
  canvas {
    border: 1px solid darkgreen;
    margin-bottom: 10px;
  }
  </style>
  