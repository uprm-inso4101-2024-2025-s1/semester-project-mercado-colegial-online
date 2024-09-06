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

document.getElementById("mySubmit").onclick = function() {      //takes user input
    fullName = document.getElementById("myName").value;
    username = document.getElementById("myUsername").value;
    email = document.getElementById("myEmail").value;
    phone = document.getElementById("myPhone").value;
    password = document.getElementById("myPassword").value;

    // Create a new User instance after the button is clicked
    const user1 = new User(fullName, username, email, phone, password);
    user1.displayInfo();
    fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(user1.json()),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json()).then(data => {
        console.log(data);
        const messageElement = document.createElement('p');
        messageElement.innerHTML = data.message;
        document.body.appendChild(messageElement);
    });
};
