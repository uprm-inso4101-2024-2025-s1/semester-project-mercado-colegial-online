/*

class User {
    static userCount = 0;

    constructor(fullName, username, email, phone, password) {
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.password = password;

        User.userCount++;   // keeps track of how many users there are
    }

    // Setters
    setfullName(newFullName) {
        this._fullName = newFullName;
    }

    setusername(newUsername) {
        this._username = newUsername;
    }

    setemail(newEmail) {
        this._email = newEmail;
    }

    setphone(newPhone) {
        this._phone = newPhone;
    }

    setpassword(newPassword) {
        this._password = newPassword;
    }


    // Getters
    getFullName() {
        return this.fullName;
    }

    getUserName() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getPhone() {
        return this.phone;
    }

    // Display User info
    displayInfo() {
        console.log(`User's name: ${this.fullName}`);
        console.log(`User's username: ${this.username}`);
        console.log(`User's email: ${this.email}`);
        console.log(`User's phone: ${this.phone}`);
    }
}




let fullName, username, email, phone, password;

document.getElementById("mySubmit").onclick = function() {      //takes user input
    fullName = document.getElementById("myName").value;
    username = document.getElementById("myUsername").value;
    email = document.getElementById("myEmail").value;
    phone = document.getElementById("myPhone").value;
    password = document.getElementById("myPassword").value;

    // Create a new User instance after the button is clicked
    const user1 = new User(fullName, username, email, phone, password);     
    user1.displayInfo();
};

*/


//Web Dev Team work here

import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../views/Welcome.vue';
import Home from '../views/Home.vue';
import ClientLogIn from '../views/ClientLogIn.vue';
import SellerDashboard from '../views/SellerDash.vue';  // Import the SellerDashboard component
import SellerLogIn from '../views/SellerLogin.vue';  // Import the SellerLogIn component

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/clientlogin',
    name: 'ClientLogIn',
    component: ClientLogIn,
  },
  {
    path: '/seller-dash',  // New route for the Seller Dashboard
    name: 'SellerDash',
    component: SellerDashboard,
  },
  {
    path: '/sellerlogin',  // New route for the Seller Login
    name: 'SellerLogIn',
    component: SellerLogIn,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;