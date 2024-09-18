let errorMessages = [] // Will store any error messages generated


// Valid emails must end in @upr.edu
function validateEmailFormat(){
    const email = document.getElementById("myEmail").value;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    const domain = email.slice(-8);

    if(!emailPattern.test(email)){
        errorMessages.push("Please enter use a valid email format.");
    } else if(domain != "@upr.edu"){
        errorMessages.push("Please use your UPR email.")
    }
}


// Usernames must be written using alphanumeric characters, cannot have spaces and must be 5 to 20 characters long
function validateUsernameFormat(){
    const username = document.getElementById("myUsername").value;

    const alphanumericPattern = /^[a-zA-Z0-9]+$/;

    if(!alphanumericPattern.test(username)){
        errorMessages.push("Usernames may only contain alphanumeric characters.");
    }
    if(username.length < 5){
        errorMessages.push("Username is too short. It must be at least 5 characters.");
    }
    if(username.length > 20){
        errorMessages.push("Username is too long. It must be at most 20 characters.");
    }
}


// Phone numbers must be written using numbers and contain 10 digits
function validatePhoneFormat(){
    const phone = document.getElementById("myPhone").value;

    const numberPattern = /^[0-9]+$/;

    if(!numberPattern.test(phone)){
        errorMessages.push("Please only use numbers to write phone number.");
    }
    if(phone.length != 10){
        errorMessages.push("Phone numbers must contain exactly 10 digits.")
    }
}


// Function to call all validation methods and add error messages to 
function validateInputFormat(){
    errorMessages = []; // Array is cleared every time inputs are validated

    const formatErrorMessages = document.getElementById("formatErrorMessages");
    formatErrorMessages.textContent = "";

    validateUsernameFormat();
    validateEmailFormat();
    validatePhoneFormat();

    // If validation fails, function will display all error messages and return false
    if(errorMessages.length > 0){
        formatErrorMessages.innerHTML = errorMessages.join("<br>");
        return false;
    } else{
        return true;
    }
}


// Stops submission if any errors are generated during the format validation
document.getElementById("mySubmit").addEventListener("click", function(event){
    if(!validateInputFormat()){
        event.preventDefault();
    }
});