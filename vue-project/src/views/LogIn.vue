<template>
    <body>
        <h1 class="title">Mercado Colegial</h1>
        <form @submit.prevent="login">
            <div class="form">
                <div class="formElement">
                    <label for="email">Email:</label>
                    <input v-model="email" type="email" id="email" placeholder="Enter email" required />
                </div>
                <div class="formElement">
                    <label for="password">Password:</label>
                    <input v-model="password" type="password" id="password" placeholder="Enter password" required />
                </div>
                <router-link to="/home"> <!-- Change 'to' to "/seller-das" to make it go to the seller dashboard -->
                    <div class="formElement">
                        <button class="btn" type="submit">Log In</button>
                    </div>
                </router-link>
            </div>
        </form>   
    </body>
</template>

<script>
export default {
    name: "LogIn",
    data() {
        return {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            institutionalEmail: "",
            studentNumber: "",
            signUpPassword: "",
        };
    },
    methods: {
        login() {
            // Simple hardcoded login logic
            if (this.email === "client@upr.edu" && this.password === "password123") {
                this.$router.push('/home');
            } else if (this.email === "seller@upr.edu" && this.password === "password123") {
                this.$router.push('/seller-dash');
            } else {
                alert('Invalid email or password.');
            }
        },
    }
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

</style>
