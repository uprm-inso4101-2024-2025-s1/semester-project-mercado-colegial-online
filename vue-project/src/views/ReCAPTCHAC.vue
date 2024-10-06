
<template>
    <div class="recaptcha-container">
        <h1 class="title">Mercado Colegial</h1>

        <!-- Login Form -->
        <div class="reCAPTCHAC">
            <form @submit.prevent="check">
                <div class="form">
                    <div class="formElement">
                        <div>Items names: {{ items }}</div>

                        <input type="checkbox" id="photo 1" value="photo 1" v-model="items" />
                        <label for="jack">photo 1</label>

                        <input type="checkbox" id="photo 2" value="photo 2" v-model="items" />
                        <label for="john">photo 2</label>

                        <input type="checkbox" id="photo 3" value="photo 3" v-model="items" />
                        <label for="mike">photo 3</label>
                    </div>

                    <div class="formElement">
                        <router-link to="/clientlogin">
                            <button class="btn" type="submit">Check</button>
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
    name: "reCAPTCHA-INFO",
    data() {
        return{
        email: "",
            answer: "",
            errorMessage: "",
    };

    },
    methods: {
        check() {
            // Basic validation for empty fields
            if (this.answer = "") {
                this.errorMessage = "Answer is empty";
                alert("Answer is empty")
                return;
            }

            // Simple hardcoded answer logic
            else {
                if (this.answer === "yes") {
                this.errorMessage = "robot";
                alert("you a robot");
            }   else {
                this.errorMessage = "";
            }
        }},

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
    flex-direction: ;
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
