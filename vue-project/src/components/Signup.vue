<template>
	<div>
	  <h1 id="myH1">Sign Up</h1>
	  <h2><a href="./index.html">Click here to log in</a></h2>
  
	  <label>Full Name:</label>
	  <input v-model="fullName" id="myName"><br>
  
	  <label>Username:</label>
	  <input v-model="username" id="myUsername"><br>
  
	  <label>Email:</label>
	  <input v-model="email" id="myEmail"><br>
  
	  <label>Phone Number:</label>
	  <input v-model="phone" id="myPhone"><br>
  
	  <label>Password:</label>
	  <input type="password" v-model="password" id="myPassword"><br>
	  <input type="checkbox" @click="togglePasswordVisibility">Show Password
	  <br>
  
	  <div id="formatErrorMessages" v-html="formatErrorMessages"></div>
	  <div id="passwordError" style="color: red;" v-html="passwordError"></div>
  
	  <button @click="submitForm">Submit</button>
  
	  <p v-if="errorMessage">{{ errorMessage }}</p>
	  <p v-if="successMessage">{{ successMessage }}</p>
	</div>
  </template>
  
  <script>
  import User from '../user.js'; // Import the User class
  import CryptoJS from 'crypto-js'; // Ensure CryptoJS is available
  
  export default {
	name: 'Signup',
	data() {
	  return {
		fullName: '',
		username: '',
		email: '',
		phone: '',
		password: '',
		formatErrorMessages: '',
		passwordError: '',
		errorMessage: '',
		successMessage: '',
		userArray: JSON.parse(localStorage.getItem('LocalUsersArray')) || [],
		errorMessages: []
	  };
	},
	methods: {
	  togglePasswordVisibility() {
		const passwordField = document.getElementById("myPassword");
		if (passwordField.type === "password") {
		  passwordField.type = "text";
		} else {
		  passwordField.type = "password";
		}
	  },
	  validateEmailFormat() {
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const domain = this.email.slice(-8);
  
		if (!emailPattern.test(this.email)) {
		  this.errorMessages.push("Please enter a valid email format.");
		} else if (domain !== "@upr.edu") {
		  this.errorMessages.push("Please use your UPR email.");
		}
	  },
	  validateUsernameFormat() {
		const alphanumericPattern = /^[a-zA-Z0-9]+$/;
  
		if (!alphanumericPattern.test(this.username)) {
		  this.errorMessages.push("Usernames may only contain alphanumeric characters.");
		}
		if (this.username.length < 5) {
		  this.errorMessages.push("Username is too short. It must be at least 5 characters.");
		}
		if (this.username.length > 20) {
		  this.errorMessages.push("Username is too long. It must be at most 20 characters.");
		}
	  },
	  validatePhoneFormat() {
		const numberPattern = /^[0-9]+$/;
  
		if (!numberPattern.test(this.phone)) {
		  this.errorMessages.push("Please only use numbers to write phone number.");
		}
		if (this.phone.length !== 10) {
		  this.errorMessages.push("Phone numbers must contain exactly 10 digits.");
		}
	  },
	  validateInputFormat() {
		this.errorMessages = []; // Clear the error messages array
		this.formatErrorMessages = ""; // Clear the UI error messages
  
		this.validateUsernameFormat();
		this.validateEmailFormat();
		this.validatePhoneFormat();
  
		// If validation fails, show the error messages
		if (this.errorMessages.length > 0) {
		  this.formatErrorMessages = this.errorMessages.join("<br>");
		  return false;
		}
		return true;
	  },
	  validatePassword() {
		const password = this.password;
		let errorMessages = [];
  
		const upperCase = /[A-Z]/.test(password);
		const lowerCase = /[a-z]/.test(password);
		const number = /\d/.test(password);
		const specialChar = /[-_@#$^*+.!=%()]/.test(password);
		const length = password.length >= 8 && password.length <= 30;
		const repetitiveChar = /(.)\1{3,}/.test(password);
  
		const hasSequentialChars = (password) => {
		  const seqRegex = /(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i;
		  return seqRegex.test(password);
		};
  
		const commonPasswords = ["password", "welcome", "admin", "user", "test", "letmein", "123456", "iloveyou"];
		const isCommonPassword = commonPasswords.includes(password.toLowerCase());
  
		// Clear passwordError initially
		this.passwordError = "";
  
		// Add validation rules
		if (!length) {
		  errorMessages.push("Password must be between 8 and 30 characters long.");
		}
		if (!upperCase) {
		  errorMessages.push("Password must contain at least one uppercase letter.");
		}
		if (!lowerCase) {
		  errorMessages.push("Password must contain at least one lowercase letter.");
		}
		if (!number) {
		  errorMessages.push("Password must contain at least one number.");
		}
		if (!specialChar) {
		  errorMessages.push("Password must contain at least one special character.");
		}
		if (repetitiveChar) {
		  errorMessages.push("Password contains repetitive characters (e.g., 'aaaa', '1111').");
		}
		if (hasSequentialChars(password)) {
		  errorMessages.push("Password contains a sequential pattern (e.g., '123', 'abc').");
		}
		if (isCommonPassword) {
		  errorMessages.push("Password is too common.");
		}
  
		// Display error messages
		if (errorMessages.length > 0) {
		  this.passwordError = errorMessages.join("<br>");
		  return false;
		} else {
		  this.passwordError = "Password is valid!";
		  return true;
		}
	  },
	  submitForm() {
		if (this.fullName !== "" && this.username !== "" && this.email !== "" && this.phone !== "" && this.password !== "") {
		  const isInputValid = this.validateInputFormat();
		  if (!isInputValid) return;
  
		  const isPasswordValid = this.validatePassword();
		  if (!isPasswordValid) return;
  
		  const hashedPassword = CryptoJS.SHA512(this.password).toString();
		  console.log(`Hashed Password: ${hashedPassword}`);
  
		  const user1 = new User(this.fullName, this.username, this.email, this.phone, hashedPassword);
		  user1.displayInfo();
		  this.userArray.push(user1);
		  console.log('Users Array', { userArray: this.userArray });
  
		  fetch('http://localhost:3000/signup', {
			method: 'POST',
			body: JSON.stringify(user1.json()),
			headers: { 'Content-Type': 'application/json' }
		  })
			.then(response => response.json())
			.then(data => {
			  console.log(data);
			  this.successMessage = data.message;
			  localStorage.setItem('LocalUsersArray', JSON.stringify(this.userArray));
			})
			.catch(error => {
			  this.errorMessage = "Error submitting data";
			  console.error("Error:", error);
			});
  
		  this.errorMessage = "";
		} else {
		  this.errorMessage = "Please fill in all fields to continue.";
		}
	  }
	}
  };
  </script>
  