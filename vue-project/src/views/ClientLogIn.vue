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

          <!-- CAPTCHA Element -->
          <div class="formElement">
            <label>CAPTCHA:</label>
            <img :src="captchaImage" alt="CAPTCHA" @click="refreshCaptcha" class="captcha-image" />
            <input v-model="captchaInput" type="text" placeholder="Enter the text shown above" required />
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
      captchaImage: "", // URL for CAPTCHA image
      captchaInput: "", // User input for CAPTCHA
      captchaError: "", // Error message for CAPTCHA
    };
  },
  created() {
    this.refreshCaptcha(); // Load the CAPTCHA on component creation
  },
  methods: {
    login() {
      // Basic validation for empty fields
      if (!this.email || !this.password) {
        this.errorMessage = "Both fields are required.";
        return;
      }

      // Simple hardcoded login logic
      if (this.email === "test@example.com" && this.password === "password123") {
        this.errorMessage = "";
        alert("Login successful!");
      } else {
        this.errorMessage = "Invalid email or password.";
      }
    },
    async signUp() {
      // Basic validation for sign up fields
      if (!this.firstName || !this.lastName || !this.institutionalEmail || !this.studentNumber || !this.signUpPassword) {
        this.errorMessage = "All fields are required to sign up.";
        return;
      }

      // Validate CAPTCHA before allowing sign-up
      const isCaptchaValid = await this.validateCaptcha();
      if (!isCaptchaValid) {
        this.captchaError = "Incorrect CAPTCHA. Please try again.";
        this.refreshCaptcha(); // Refresh CAPTCHA if input is incorrect
        return;
      }

      alert(`Welcome, ${this.firstName}! Your account has been created.`);
      // Handle sign-up logic (e.g., form submission, API call)
    },
    refreshCaptcha() {
      // Call the backend to fetch a new CAPTCHA image URL
      fetch('/your-api-endpoint')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); 
            }
            return response.json();
        })
        .then(data => {
            // Process the JSON data
            console.log(data);
        })
        .catch(error => {
            console.error('Error parsing JSON:', error);
            // Handle the error (e.g., display a user-friendly message)
        });
    },
    validateCaptcha() {
      // Call the backend to validate the entered CAPTCHA text
      return fetch("http://localhost:5173/validate-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captchaInput: this.captchaInput }),
      })
        .then((response) => response.json())
        .then((data) => {
          return data.isValid; // Return true if CAPTCHA is correct
        })
        .catch((error) => {
          console.error("CAPTCHA validation error:", error);
          return false;
        });
    },
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

.captcha-image {
  cursor: pointer;
  border: 1px solid #ccc;
  margin: 10px 0;
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
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
</style>
