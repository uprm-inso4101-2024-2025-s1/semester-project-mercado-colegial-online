<template>
    <div class="seller-login">
        <h1 class="title">Mercado Colegial</h1>
        <form @submit.prevent="handleLogin">
            <div class="formElement">
                <label for="email">Email:</label>
                <input type="email" v-model="email" id="email" placeholder="Enter your email" required />
            </div>
            <div class="formElement">
                <label for="password">Password:</label>
                <input type="password" v-model="password" id="password" placeholder="Enter your password" required />
            </div>
            <div class="formElement">
                <button class="btn" type="submit">Login</button>
            </div>
        </form>
    </div>
    
    <div class="seller-signUp">
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
                <div class="formElement">
                    <button class="btn" type="submit">Join Now</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: "",
            firstName: "",
            lastName: "",
            institutionalEmail: "",
            studentNumber: "",
            signUpPassword: "",
        };
    },
    methods: {
        handleLogin() {
            // Handle login logic here
            
            if(this.email === 'example.email@gmail.com' && this.password === 'password123') {
                alert('Login successful!');
                this.$router.push('/seller-dash');
            } else {
                alert('Invalid email or password.');
            }
        },
        handlesignUp() {
            // Handle sign-up logic here
            if (!this.firstName || !this.lastName || !this.institutionalEmail || !this.studentNumber || !this.signUpPassword) {
                this.errorMessage = "All fields are required to sign up.";
                return;
            }

            alert(`Welcome, ${this.firstName}! Your account has been created.`);
            this.$router.push('/seller-dash');
        }
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
</style>