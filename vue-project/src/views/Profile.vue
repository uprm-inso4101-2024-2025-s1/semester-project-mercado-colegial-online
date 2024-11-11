<template>
      <!-- top of page -->
      <nav class="navbar">
    <div class="navbar-brand">
      <a href="/" class="brand-name">
        <span class="mercado">Mercado </span>
        <span class="colegial">Colegial</span>
      </a>
    </div>
    <div :class="['navbar-menu', { 'is-active': menuActive }]">
      <router-link to="/Home" class="nav-item">
        <img src="../assets/home.png" alt=" " width="35" height="35" />
      </router-link>
      <router-link to="/productSearch" class="nav-item">
        <img src="../assets/products.png" alt=" " width="35" height="35" />
      </router-link>
      <router-link to="/Cart" class="nav-item">
          <img src="../assets/shopping.png" alt=" " width="35" height="35" />
      </router-link>
    </div>
  </nav>

  <!-- profile menu -->
    <div class="profile-container">
      <aside class="sidebar">
        <ul>
          <li @click="selectOption('your profile')">Your profile</li>
          <li @click="selectOption('sign out')">Sign out</li>
        </ul>
      </aside>
      <main class="main-content">
        <h1>Profile</h1>
        <div v-if="selectedOption === 'your profile'">

          <body>
        <form @submit.prevent="signUp">
            <div class="form">
                <div class="formElement">
                    <label for="firstName">Full Name: {{ Name }}</label>
                    <input v-model="Name" type="text" id="Name" placeholder="First and last name" required maxlength = "50"/>
                </div>
                <div class="formElement">
                    <label for="institutionalEmail">Institutional Email: {{ institutionalEmail }}</label>
                    <input v-model="institutionalEmail" type="email" id="institutionalEmail" placeholder="Enter your institutional email" required maxlength = "50" />
                </div>
                <div class="formElement">
                    <label for="studentNumber">Student Number: {{ formattedStudentNumber }}</label>
                    <input 
                        v-model="formattedStudentNumber" 
                        @input="formatStudentNumber" 
                        type="text" 
                        id="studentNumber" 
                        placeholder="Enter your student number" 
                        required maxlength = "11"
                    />
                </div>
                <div class="formElement">
                    <label for="signUpPassword">Password:</label>
                    <input v-model="signUpPassword" type="password" id="signUpPassword" placeholder= "Password" required maxlength = "50" />
                </div>
                <div class="formElement">
                    <label for="signUpPassword">Password Confirmation:</label>
                    <input v-model="signUpPassword1" type="password" id="signUpPassword1" placeholder="Confirm your password" required maxlength = "50" />
                </div>
                <div v-if="isSeller">
                    <div class="formElement">
                        <label for="storeName">Shop name:</label>
                        <input v-model="storeName" type="text" id="storeName" placeholder="Enter your shop name" required />
                    </div>
                </div>
                <div class="formElement">
                    <button class="btn" type="submit">Save changes</button>
                </div>
            </div>
        </form> 
    </body>
        </div>
        <!-- sign out option -->
        <div v-if="selectedOption === 'sign out'">
            <div class="buttons">
            <router-link to="/LogIn">
            <button class="btn signout">Sign out</button>
            </router-link>
    </div>
        </div>
        <div v-if="infoToDisplay.length">
          <h2>{{ infoToDisplayTitle }}</h2>
          <div class="info-block" v-for="item in infoToDisplay" :key="item">
            <p>{{ item }}</p>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedOption: null,
        infoToDisplay: [],
        infoToDisplayTitle: '',
        Name: "Ex. Name",
        institutionalEmail: "Ex. institutionalEmail",
        formattedStudentNumber: "Ex. formattedStudentNumber",
        signUpPassword: "",
        signUpPassword1: "",
        isSeller: false,            
        storeName: "",
        captcha: "", // Stores generated CAPTCHA
        captchaInput: "", // Stores user's CAPTCHA input
        captchaError: "", // Displays CAPTCHA error
      };
    },
    methods: {
        formatStudentNumber() {
            // Remove all non-digit characters
            let digits = this.formattedStudentNumber.replace(/\D/g, '');

            // Format to "###-##-####" with dashes after 3rd and 5th digits
            if (digits.length > 2) {
                // Insert dash after the third digit
                digits = digits.replace(/(\d{3})(\d{0,2})(\d{0,4})/, '$1-$2$3');
            }
            if (digits.length > 5) {
                // Insert dash after the fifth digit
                digits = digits.replace(/(\d{3}-\d{2})(\d{0,4})/, '$1-$2');
            }
            this.formattedStudentNumber = digits;
        },
        signUp() {
            if (!this.institutionalEmail.endsWith("@upr.edu")){
                alert("Email incorrecto.")
                return;
            } else if (!this.formattedStudentNumber.startsWith("802") || this.formattedStudentNumber.replace(/[^0-9]/g, '').length !== 9) { // Check if student number starts with "802"
                alert("El número de estudiante es incorrecto.");
                return;
            } else if (this.signUpPassword !== this.signUpPassword1) {
                alert("La contraseña de confirmación y la contraseña ingresada no coinciden. Intente de nuevo.")
                return;
            } else if (this.captchaInput !== this.captcha) { // Validate CAPTCHA input
                this.captchaError = "Incorrect CAPTCHA. Please try again.";
                this.refreshCaptcha();
                return;
            }

            alert(`Changes saved`);
                this.$router.push('/home');

        },
    
      selectOption(option) {
        this.selectedOption = option;
        this.infoToDisplay = [];
        this.infoToDisplayTitle = '';
      },
      displayInfo(info) {
        const infoMap = {
          trackOrders: ['Order #1234', 'Order #5678', 'Order #91011'],
          buyAgain: ['Item A', 'Item B', 'Item C'],
          notYetShipped: ['Order #1213', 'Order #1415'],
          changeName: ['Current Name: John Doe', 'New Name: Jane Doe'],
          changeEmail: ['Current Email: john@example.com', 'New Email: jane@example.com'],
          changePassword: ['Current Password: ********', 'New Password: ********'],
          addCard: ['Card Type: Visa', 'Card Number: **** **** **** 1234'],
          managePaymentMethods: ['Visa **** 1234', 'MasterCard **** 5678']
        };
        const titleMap = {
          trackOrders: 'Track Orders',
          buyAgain: 'Buy Again',
          notYetShipped: 'Not Yet Shipped',
          changeName: 'Change Name',
          changeEmail: 'Change Email',
          changePassword: 'Change Password',
          addCard: 'Add a Card',
          managePaymentMethods: 'Manage Payment Methods'
        };
        this.infoToDisplay = infoMap[info];
        this.infoToDisplayTitle = titleMap[info];
      }
    }
    
  };
  </script>
  
  <style scoped>
  html, body {
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .profile-container {
    display: flex;
    width: 100%;
    /*max-width: 1200px;*/
    height: 80%;
    /*max-height: 800px;*/
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .sidebar {
    width: 25%;
    background-color: green;
    color: white;
    padding: 40px;
  }
  
  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar li {
    cursor: pointer;
    margin-bottom: 10px;
    padding: 280px;
    border-radius: 4px;
    background-color: #006400; /* Dark green */
    text-align: center;
  }
  
  .sidebar li:hover {
    background-color: #228B22; /* Forest green */
  }
  
  .main-content {
    flex-grow: 1;
    background-color: white;
    color: green;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  input {
    display: block;
    margin-bottom: 12px;
    padding: 8px;
    border: 1px solid green;
    border-radius: 4px;

  }
  
  button {
    background-color: green;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  
  button:hover {
    background-color: #006400; /* Dark green */
  }
  
  .info-block {
    border: 1px solid green;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #f0f0f0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 600px;
    text-align: center;
  }
  
  .info-block p {
    margin: 0;
  }

  /**/ 
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
  z-index: 1000; /* High z-index to stay on top of other elements */
}

  
  .navbar-brand .brand-name {
    font-size: 34px;
    font-weight: bold;
    text-decoration: none;
  }
  
  .mercado {
    color: darkgreen;
    font-weight: bold;
  }
  
  .colegial {
    color: darkgreen;
    font-weight: bold;
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
    color: darkgreen;
  }
  </style>