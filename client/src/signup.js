let fullName, username, email, phone, password;
let userArray = [];                                             //Initialize userArray for local storage

document.getElementById("mySubmit").onclick = function() {      //takes user input
    fullName = document.getElementById("myName").value;
    username = document.getElementById("myUsername").value;
    email = document.getElementById("myEmail").value;
    phone = document.getElementById("myPhone").value;
    password = document.getElementById("myPassword").value;

    // Validate that all required fields were filled
    if(fullName!="" && username!="" && email!="" && phone!="" && password!=""){

        const passwordError = document.getElementById("passwordError");
        passwordError.textContent = "";

        const isPasswordValid = validatePassword();

        if (!isPasswordValid){
            return;
        }

        // Create a new User instance after the button is clicked
        const user1 = new User(fullName, username, email, phone, password);
        user1.displayInfo();
        userArray.push(user1);                                      //Adds user1 to userArray
        console.log('Users Array', {userArray});                    
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            body: JSON.stringify(user1.json()),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json()).then(data => {
            console.log(data);
            const messageElement = document.createElement('p');
            messageElement.innerHTML = data.message;
            document.body.appendChild(messageElement);
        });

        //Saving to local storage
        localStorage.setItem('LocalUsersArray',JSON.stringify(userArray));

        if(document.getElementById("errorMessage")){
            document.getElementById("errorMessage").remove()
        }
        
    } else{

        // If all fields were not filled, error message is displayed and no user is created
        console.log("Required sing up information is missing")
        const errorMessage = document.createElement('p');
        errorMessage.id = "errorMessage"
        errorMessage.innerHTML = "Please fill in all fields to continue";
        if(!document.getElementById("errorMessage")){
            document.body.appendChild(errorMessage);
        }
        
    }
};
