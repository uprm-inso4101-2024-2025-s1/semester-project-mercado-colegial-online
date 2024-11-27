<template>

    <body>
        <h1 class="title">Mercado Colegial</h1>
        <form @submit.prevent="login">
            <div class="form">
                <div class="formElement">
                    <label for="email">Email:</label>
                    <input v-model="email" type="email" id="email" placeholder="Enter email" required data-test-id="email-input"/>
                </div>
                <div class="formElement">
                    <label for="password">Password:</label>
                    <input v-model="password" type="password" id="password" placeholder="Enter password" required data-test-id="pass-input"/>
                </div>
                <div class="formElement">
                    <button class="btn" type="submit" data-test-id="login-button">Log In</button>
                </div>
            </div>
        </form>
    </body>
</template>

<script>
import User from '../user.js'; // Import the User class
import CryptoJS from 'crypto-js';

export default {
    name: "LogIn",
    data() {
        return {
            email: "",
            password: "",
            userArray: []
        };
    },
    methods: {
        login() {
            if (this.email !== "" && this.password !== "") {
                const hashedPassword = CryptoJS.SHA512(this.password).toString();

                // Create a new User instance
                const user1 = new User("", "", this.email, hashedPassword, "");
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
                        if (data.message === "User not found") {
                            alert("User not found. Please register first");
                            return;
                        } else if (data.message === "Invalid credentials") {
                            alert("Invalid credentials. Please try again");
                            return;
                        } else if (data.message === 'Failed to login') {
                            throw new Error("Failed to login");
                        }
                        localStorage.setItem('LocalUsersArray', JSON.stringify(this.userArray));
                        if (data.user.isSeller) {
                            this.$router.push('/seller-dash');
                        } else {
                            this.$router.push('/home');
                        }
                    })
                    .catch(error => {
                        alert("Error submitting data");
                        console.error("Error:", error);
                    });
            } else {
                alert("Please fill in all fields to continue");
            }
        },
    }
};
</script>

<style scoped>
body {
    background-color: rgb(73, 95, 60);
    height: 100%;
    margin: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.title {
    font-size: 3em;
    color: rgb(105, 238, 85);
    margin: 0px;
    padding: 10px;
}

.form {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    color: hsl(0, 0%, 85%);
    background-color: green;
    border: 3px solid #495F3C;
    border-radius: 10px;
    cursor: pointer;
}

.btn:hover {
    background-color: #495F3C;
    border: 3px solid green;
}

label {
    margin-bottom: 8px;
    font-size: 1.28em;
    color: rgb(105, 238, 85);
}

input {
    background-color: hsl(98, 23%, 40%);
    font-size: 1em;
    border: 3px solid green;
    border-radius: 10px;
    padding: 5px;
    width: 100%;
    max-width: 300px;
    color: hsl(0, 0%, 85%);
    outline: none;

}

input::placeholder {
    color: hsl(0, 0%, 85%);
}


</style>
