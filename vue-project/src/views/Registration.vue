<template>
    <div>
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
    </div>
</template>

<script>
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

            alert(`Welcome, ${this.Name}! Your account has been created.`);
            if (this.isSeller) {
                this.$router.push('/seller-dash');
            } else {
                this.$router.push('/home');
            }
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
    },
    mounted() {
        this.generateCaptcha(); // Generate CAPTCHA when the component mounts
    },
};
</script>

<style scoped>
    body {
        height: 100%;
        margin: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .title {
        font-size: 3em;
        color: green; 
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

    .seller-question {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .btn {
        margin-top: 20px;
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
        margin-bottom: 8px;
        font-size: 1.28em;
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

    canvas {
        border: 1px solid darkgreen;
        margin-bottom: 10px;
    }
</style>