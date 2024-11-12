<template>
    <body>
        <h1 class="title">Mercado Colegial</h1>
        <form @submit.prevent="signUp">
            <div class="form">
                <div class="formElement">
                    <label for="firstName">Full Name:</label>
                    <input v-model="Name" type="text" id="Name" placeholder="First and last name" required />
                </div>
                <div class="formElement">
                    <label for="institutionalEmail">Institutional Email:</label>
                    <input v-model="institutionalEmail" type="email" id="institutionalEmail" placeholder="Enter your institutional email" required />
                </div>
                <div class="formElement">
                    <label for="studentNumber">Student Number:</label>
                    <input 
                        v-model="formattedStudentNumber" 
                        @input="formatStudentNumber" 
                        type="text" 
                        id="studentNumber" 
                        placeholder="Enter your student number" 
                        required 
                    />
                </div>
                <div class="formElement">
                    <label for="signUpPassword">Password:</label>
                    <input v-model="signUpPassword" type="password" id="signUpPassword" placeholder="Create your password" required />
                </div>
                <div class="formElement">
                    <label for="signUpPassword">Password Confirmation:</label>
                    <input v-model="signUpPassword1" type="password" id="signUpPassword1" placeholder="Confirm your password" required />
                </div>

                <!-- CAPTCHA Section -->
                <div class="formElement">
                    <label for="captchaInput">Enter the CAPTCHA:</label>
                    <canvas id="captchaCanvas" width="100" height="40"></canvas>
                    <input v-model="captchaInput" type="text" id="captchaInput" placeholder="Enter CAPTCHA" required />
                    <p v-if="captchaError" class="error">{{ captchaError }}</p>
                </div>

                <div class="formElement seller-question">
                    <label for="isSeller">Are you a seller?</label>
                    <input type="checkbox" id="isSeller" v-model="isSeller" /> 
                </div>
                <div v-if="isSeller">
                    <div class="formElement">
                        <label for="storeName">Shop name:</label>
                        <input v-model="storeName" type="text" id="storeName" placeholder="Enter your shop name" required />
                    </div>
                </div>
                <div class="formElement">
                    <button class="btn" type="submit">Sign Up</button>
                </div>
            </div>
        </form> 
    </body>
</template>

<script>
import User from '../user.js'; // Import the User class
import CryptoJS from 'crypto-js'; // Ensure CryptoJS is available

export default {
    name: "Registration",
    data() {
        return {
            Name: "",
            institutionalEmail: "",
            formattedStudentNumber: "",
            signUpPassword: "",
            signUpPassword1: "",
            isSeller: false,
            storeName: "",
            captcha: "", // Stores generated CAPTCHA
            captchaInput: "", // Stores user's CAPTCHA input
            captchaError: "", // Displays CAPTCHA error
            userArray: JSON.parse(localStorage.getItem('LocalUsersArray')) || [],
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
            if (!this.institutionalEmail.endsWith("@upr.edu")) {
                alert("Email incorrecto.")
                return;
            } else if (!this.formattedStudentNumber.startsWith("802") || this.formattedStudentNumber.replace(/[^0-9]/g, '').length !== 9) { // Check if student number starts with "802"
                alert("El número de estudiante es incorrecto.");
                return;
            } else if (!this.validatePassword()) {
                return;
            } else if (this.signUpPassword !== this.signUpPassword1) {
                alert("La contraseña de confirmación y la contraseña ingresada no coinciden. Intente de nuevo.")
                return;
            } else if (this.captchaInput !== this.captcha) { // Validate CAPTCHA input
                this.captchaError = "Incorrect CAPTCHA. Please try again.";
                this.refreshCaptcha();
                return;
            }

            const hashedPassword = CryptoJS.SHA512(this.signUpPassword).toString();
            const user1 = new User(this.Name, this.formattedStudentNumber, this.institutionalEmail, hashedPassword, isSeller ? 'admin' : 'student');

            this.userArray.push(user1);

            fetch('http://localhost:3000/signup', {
                method: 'POST',
                body: JSON.stringify(user1.json()),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message == 'Failed to sign up') {
                        throw new Error("Failed to sign up");
                    }
                    localStorage.setItem('LocalUsersArray', JSON.stringify(this.userArray));
                    alert(`Welcome, ${this.Name}! Your account has been created.`);
                    if (this.isSeller) {
                        this.$router.push('/seller-dash');
                    } else {
                        this.$router.push('/home');
                    }
                })
                .catch(error => {
                    alert("Error submitting data");
                    console.error("Error:", error);
                });
        },

        // Generate a new CAPTCHA
        generateCaptcha() {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let captcha = "";
            for (let i = 0; i < 6; i++) {
                captcha += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            this.captcha = captcha;

            // Render the CAPTCHA on the canvas
            const canvas = document.getElementById("captchaCanvas");
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous CAPTCHA
            ctx.font = "20px Arial";
            ctx.fillStyle = "darkgreen";
            ctx.fillText(this.captcha, 10, 30); // Draw the CAPTCHA string
        },

        // Refresh the CAPTCHA (generate a new one)
        refreshCaptcha() {
            this.generateCaptcha();
        },
        validatePassword() {
            const password = this.signUpPassword;
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
                alert(errorMessages.join("\n"));
                return false;
            } else {
                return true;
            }
        },
    },
    mounted() {
        this.generateCaptcha(); // Generate CAPTCHA when the component mounts
    },
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

.seller-question {
    display: flex;
    flex-direction: row;
    align-items: center;
}

canvas {
    background-color: lightgreen;
    border: 1px solid darkgreen;
    margin-bottom: 10px;
}

</style>