class User {
    static userCount = 0;

    constructor(fullName, username, email, phone, password) {
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.password = password;

        User.userCount++;   // keeps track of how many users there are
    }

    // Setters
    setfullName(newFullName) {
        this._fullName = newFullName;
    }

    setusername(newUsername) {
        this._username = newUsername;
    }

    setemail(newEmail) {
        this._email = newEmail;
    }

    setphone(newPhone) {
        this._phone = newPhone;
    }

    setpassword(newPassword) {
        this._password = newPassword;
    }


    // Getters
    getFullName() {
        return this.fullName;
    }

    getUserName() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getPhone() {
        return this.phone;
    }

    // Display User info
    displayInfo() {
        console.log(`User's name: ${this.fullName}`);
        console.log(`User's username: ${this.username}`);
        console.log(`User's email: ${this.email}`);
        console.log(`User's phone: ${this.phone}`);
    }

    // Return data in json
    json() {
        return {
            fullName: this.fullName,
            username: this.username,
            email: this.email,
            phone: this.phone,
            password: this.password
        };
    }
}




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
