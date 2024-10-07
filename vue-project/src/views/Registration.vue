<template>
    <body>
        <h1 class="title">Mercado Colegial</h1>
        <form @submit.prevent="signUp">
            <div class="form">
                <div class="formElement">
                    <label for="firstName">Nombre:</label>
                    <input v-model="Name" type="text" id="Name" placeholder="Ingresa tu nombre y apellidos" required />
                </div>
                <div class="formElement">
                    <label for="institutionalEmail">Email Institucional:</label>
                    <input v-model="institutionalEmail" type="email" id="institutionalEmail" placeholder="Ingresa tu email institucional" required />
                </div>
                <div class="formElement">
                    <label for="studentNumber">Número de Estudiante:</label>
                    <input 
                        v-model="formattedStudentNumber" 
                        @input="formatStudentNumber" 
                        type="text" 
                        id="studentNumber" 
                        placeholder="Ingresa tu número de estudiante" 
                        required 
                    />
                </div>
                <div class="formElement">
                    <label for="signUpPassword">Contraseña:</label>
                    <input v-model="signUpPassword" type="password" id="signUpPassword" placeholder="Crea tu contraseña" required />
                </div>
                <div class="formElement">
                    <label for="signUpPassword">Confirmar contraseña:</label>
                    <input v-model="signUpPassword1" type="password" id="signUpPassword1" placeholder="Confirma tu contraseña" required />
                </div>
                <div class="formElement seller-question">
                    <label for="isSeller">¿Eres vendedor?</label>
                    <input type="checkbox" id="isSeller" v-model="isSeller" /> 
                </div>
                <div v-if="isSeller">
                    <div class="formElement">
                        <label for="storeName">Nombre de la tienda:</label>
                        <input v-model="storeName" type="text" id="storeName" placeholder="Ingresa el nombre de tu tienda" required />
                    </div>
                </div>
                <div class="formElement">
                    <button class="btn" type="submit">Registrarse</button>
                </div>


            </div>
        </form> 
    </body>
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
            } 

            alert(`Welcome, ${this.Name}! Your account has been created.`);
            if (this.isSeller) {
                this.$router.push('/seller-dash');
            } else {
                this.$router.push('/home');
            }
            
        }
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
    margin-bottom: 5px;
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


</style>
