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
    const commonSequences = [
        "123", "abc", "qwerty", "password", "asdf", "zxcv",
        "0000", "1111", "2222", "3333", "abcd", "5678", "9876", "54321",
        "123456", "admin", "12345678", "123456789", "password",
        "Aa123456", "1234567890", "UNKNOWN", "Password", "Admin123", "user"
    ];

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

    commonSequences.forEach(seq => {
        if (password.toLowerCase().includes(seq)) {
            errorMessages.push(`Password contains a common sequence: '${seq}'`);
        }
    });

    if (errorMessages.length > 0) {
        passwordError.innerHTML = errorMessages.join("<br>");
        passwordError.style.color = "red";
        return false;
    } else {
        passwordError.textContent = "Password is valid!";
        passwordError.style.color = "green";
        return true;
    }

}
