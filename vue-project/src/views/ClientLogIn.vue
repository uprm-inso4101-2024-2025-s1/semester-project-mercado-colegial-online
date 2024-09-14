<template>
    <div class="client-container">
        <h1 class="title">Mercado Colegial</h1>
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
        
    </div>
</template>

<script>
export default {
    name: "ClientLogIn",
    data() {
        return {
        email: "",
        password: "",
        errorMessage: ""
        };
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
            // Redirect or show success (This can be an actual authentication call)
            alert("Login successful!");
        } else {
            this.errorMessage = "Invalid email or password.";
        }
        }
    }
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
.client-container {
    margin: 10px;
}

.form {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center elements vertically */
    align-items: center; /* Center elements horizontally */
    padding: 10px;
    height: 85vh
}

.formElement {
    display: flex;
    justify-content: center;
    align-items: center; /* Center individual form elements */
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
    display: block;
    font-size: 1em;
    color: green;
}

input {
    font-size: 1em;
    border: 2px solid darkgreen;
    border-radius: 10px;
    
}


</style>