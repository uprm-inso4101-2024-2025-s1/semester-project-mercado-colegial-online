document.getElementById("mySubmit").addEventListener("click", function (event){
    event.preventDefault();
    validatePassword();
})
function validatePassword(){
    const password = document.getElementById("myPassword").value;
    const passwordError = document.getElementById("passwordError");

    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    const number = /\d/.test(password);
    const specialChar = /[-_@#$^*+.!=%()]/.test(password);
    const length = password.length >= 8 && password.length <= 30;
    const commonSequences = !(/123|abc|qwerty|4444/.test(password));

    let errorMessages = [];

    passwordError.textContent = "";

    if (!length){
        errorMessages.push("Password must be between 8 and 30 characters long.");
    }
    if (!upperCase){
        errorMessages.push("Password must contain at least one uppercase letter.");
    }
    if (!lowerCase){
        errorMessages.push("Password must contain at least one lowercase letter.");
    }
    if (!number){
        errorMessages.push("Password must contain at least one number.");
    }
    if (!specialChar){
        errorMessages.push("Password must contain at least one special character.");
    }
    if (!commonSequences){
        errorMessages.push("Password contains a common sequence (e.g., 'abc', '123', 'qwerty').");
    }

    if (errorMessages.length > 0) {
        passwordError.innerHTML = errorMessages.join("<br>");
        return false;
    } else {
        passwordError.textContent = "Password is valid!";
        passwordError.style.color = "green";
        return true;
    }

}
