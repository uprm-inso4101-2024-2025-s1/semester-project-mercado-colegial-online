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
    // Detect repetitive characters
    const repetitiveChar = /(.)\1{3,}/.test(password); // Detect any character repeated 4 or more times

    // Check for common sequences (e.g., '123', 'abc', 'qwerty')
    const hasSequentialChars = (password) => {
        const seqRegex = /(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i;
        return seqRegex.test(password);
    };

    // Check against a list of common passwords
    const commonPasswords = ["password", "welcome", "admin", "user", "test", "letmein", "123456", "iloveyou"];
    const isCommonPassword = commonPasswords.includes(password.toLowerCase());

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

    if (repetitiveChar) {
        errorMessages.push("Password contains repetitive characters (e.g., 'aaaa', '1111').");
    }
    // Sequential pattern detection
    if (hasSequentialChars(password)) {
        errorMessages.push("Password contains a sequential pattern (e.g., '123', 'abc').");
    }
    // Common password detection
    if (isCommonPassword) {
        errorMessages.push("Password is too common.");
    }

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
