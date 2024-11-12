<template>
  <Navbar />
  <!-- Profile Page Container -->
  <div class="profile-container">
    <!-- Sidebar with Profile Options -->
    <aside class="sidebar">
      <ul>
        <li @click="selectOption('your profile')">Your Profile</li>
        <li @click="selectedOption('settings')">Settings</li>
        <li @click="selectOption('notifications')"> Notifications <span class="notification-count">3</span> </li> 
        <li @click="selectOption('sign out')">Sign Out</li>
      </ul>
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">
      <h1>Profile</h1>
      
      <div v-if="selectedOption === 'your profile'" class="form-container">
        <form @submit.prevent="signUp">
          <div class="form">
            <div class="formElement">
              <label for="Name">Full Name</label>
              <input v-model="Name" type="text" id="Name" placeholder="Enter your full name" required maxlength="50"/>
            </div>
            <div class="formElement">
              <label for="institutionalEmail">Institutional Email</label>
              <input v-model="institutionalEmail" type="email" id="institutionalEmail" placeholder="Enter your institutional email" required maxlength="50"/>
            </div>
            <div class="formElement">
              <label for="studentNumber">Student Number</label>
              <input v-model="formattedStudentNumber" @input="formatStudentNumber" type="text" id="studentNumber" placeholder="Enter your student number" required maxlength="11"/>
            </div>
            <div class="formElement">
              <label for="signUpPassword">Password</label>
              <input v-model="signUpPassword" type="password" id="signUpPassword" placeholder="Password" required maxlength="50"/>
            </div>
            <div class="formElement">
              <label for="signUpPassword1">Confirm Password</label>
              <input v-model="signUpPassword1" type="password" id="signUpPassword1" placeholder="Confirm password" required maxlength="50"/>
            </div>
            <div v-if="isSeller" class="formElement">
              <label for="storeName">Shop Name</label>
              <input v-model="storeName" type="text" id="storeName" placeholder="Enter your shop name" required/>
            </div>
            <div class="formElement">
              <button class="btn" type="submit">Save Changes</button>
            </div>
          </div>
        </form>
      </div>

      <!-- Sign Out Option -->
      <div v-if="selectedOption === 'sign out'">
        <router-link to="/LogIn">
          <button class="btn signout" @click="signOut">Sign Out</button>
        </router-link>
      </div>
      
      <!-- Information Display Area -->
      <div v-if="infoToDisplay.length">
        <h2>{{ infoToDisplayTitle }}</h2>
        <div class="info-block" v-for="item in infoToDisplay" :key="item">
          <p>{{ item }}</p>
        </div>
      </div>
    </main>
  </div>
  <Footer />
</template>

<script>
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "ProfilePage",
    components: {
      Navbar,
      Footer,
    },
  data() {
    return {
      selectedOption: 'your profile',
      infoToDisplay: [],
      infoToDisplayTitle: '',
      Name: '',
      institutionalEmail: '',
      formattedStudentNumber: '',
      signUpPassword: '',
      signUpPassword1: '',
      isSeller: false,
      storeName: ''
    };
  },
  methods: {
    formatStudentNumber() {
      let digits = this.formattedStudentNumber.replace(/\D/g, '');
      if (digits.length > 2) digits = digits.replace(/(\d{3})(\d{0,2})(\d{0,4})/, '$1-$2$3');
      if (digits.length > 5) digits = digits.replace(/(\d{3}-\d{2})(\d{0,4})/, '$1-$2');
      this.formattedStudentNumber = digits;
    },
    signUp() {
      if (!this.institutionalEmail.endsWith("@upr.edu")) {
        alert("Invalid email domain.");
        return;
      } else if (!this.formattedStudentNumber.startsWith("802") || this.formattedStudentNumber.replace(/[^0-9]/g, '').length !== 9) {
        alert("Invalid student number.");
        return;
      } else if (this.signUpPassword !== this.signUpPassword1) {
        alert("Passwords do not match.");
        return;
      }
      alert("Changes saved");
      this.$router.push('/home');
    },
    selectOption(option) {
      this.selectedOption = option;
      this.infoToDisplay = [];
      this.infoToDisplayTitle = '';
    },
    signOut() {
      if (confirm("Are you sure you want to sign out?")) {
        this.$router.push("/LogIn");
      }
    },
  }
};
</script>

<style scoped>
/* General styling omitted for brevity. Keep the navbar, profile-container, sidebar, main-content, and form styles as in your code */
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
    min-height: calc(100vh - 80px); 
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    padding-top: 80px; 
  }
  
  .sidebar {
    width: 25%;
  background-color: #006400; /* Dark green */
  color: white;
  padding: 20px;
  border-radius: 12px; /* Rounds the corners of the sidebar */
  margin-left: 10px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  cursor: pointer;
  margin-bottom: 12px;
  padding: 12px 16px; 
  border-radius: 6px;
  background-color: #006400;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s, box-shadow 0.3s;
  border: 2px solid white; 
}

.sidebar li:hover {
  background-color: #228B22; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
  border: 2px solid #90EE90; 
}
  
.main-content {
    flex-grow: 1; 
    background-color: white;
    color: green;
    padding: 20px 80px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-y: auto; 
}
  
  input {
    display: block;
  margin-bottom: 12px;
  padding: 12px 16px;  
  width: 100%;        
  max-width: 600px;   
  border: 2px solid green;
  border-radius: 8px;  
  font-size: 16px;
  }
  
  button {
    background-color: green;
  color: white;
  padding: 12px 24px;  
  border: none;
  border-radius: 8px;  
  cursor: pointer;
  font-size: 16px;
  }
  
  button:hover {
    background-color: #006400; 
  }
  
/*redundant?*/

  /* .info-block {
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
  } */
  .form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.form {
  width: 100%;
}

.formElement {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.notification-count {
  background-color: red;
  color: white;
  border-radius: 12px;
  padding: 2px 6px;
  margin-left: 8px;
  font-size: 12px;
}

</style>
