<template>
    <div class="settings-container">
      <aside class="sidebar">
        <ul>
          <li @click="selectOption('yourOrders')">Your Orders</li>
          <li @click="selectOption('loginAndSecurity')">Login & Security</li>
          <li @click="selectOption('paymentOptions')">Payment Options</li>
        </ul>
      </aside>
      <main class="main-content">
        <h1>Settings</h1>
        <div v-if="selectedOption === 'yourOrders'">
          <h2>Your Orders</h2>
          <button @click="displayInfo('trackOrders')">Track Orders</button>
          <button @click="displayInfo('buyAgain')">Buy Again</button>
          <button @click="displayInfo('notYetShipped')">Not Yet Shipped</button>
        </div>
        <div v-if="selectedOption === 'loginAndSecurity'">
          <h2>Login & Security</h2>
          <button @click="displayInfo('changeName')">Change Name</button>
          <button @click="displayInfo('changeEmail')">Change Email</button>
          <button @click="displayInfo('changePassword')">Change Password</button>
        </div>
        <div v-if="selectedOption === 'paymentOptions'">
          <h2>Payment Options</h2>
          <button @click="displayInfo('addCard')">Add a Card</button>
          <button @click="displayInfo('managePaymentMethods')">Manage Payment Methods</button>
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
        infoToDisplayTitle: ''
      };
    },
    methods: {
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
  
  .settings-container {
    display: flex;
    width: 80%;
    max-width: 1200px;
    height: 80%;
    max-height: 800px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .sidebar {
    width: 250px;
    background-color: green;
    color: white;
    padding: 20px;
  }
  
  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar li {
    cursor: pointer;
    margin-bottom: 10px;
    padding: 10px;
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
  </style>