<template>
	<div>
	  <h1 id="myH1">Log in</h1>
	  <h2><a href="./signup.html">Click here to sign up</a></h2>
  
	  <label>Username:</label>
	  <input v-model="username" id="myUsername"><br>
  
	  <label>Password:</label>
	  <input type="password" v-model="password" id="myPassword"><br>
	  <input type="checkbox" @click="togglePasswordVisibility">Show Password
	  <br>
  
	  <button @click="submitForm">Submit</button>
  
	  <p v-if="errorMessage">{{ errorMessage }}</p>
	  <p v-if="successMessage">{{ successMessage }}</p>
	</div>
  </template>
  
  <script>
  import User from '../user.js'; // Import the User class
  import CryptoJS from 'crypto-js';

  export default {
	name: 'Login',
	data() {
	  return {
		username: '',
		password: '',
		errorMessage: '',
		successMessage: '',
		userArray: []
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
	  submitForm() {
		if (this.username !== "" && this.password !== "") {
		  const hashedPassword = CryptoJS.SHA512(this.password).toString();

		  // Create a new User instance
		  const user1 = new User("", this.username, "", "", hashedPassword);
		  user1.displayInfo();
		  this.userArray.push(user1);
		  console.log('Users Array', { userArray: this.userArray });
  
		  // Send data to the server
		  fetch('http://localhost:3000/login', {
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
		  this.errorMessage = "Please fill in all fields to continue";
		}
	  }
	}
  };
  </script>
  