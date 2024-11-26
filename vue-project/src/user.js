class User {
    static userCount = 0;

    constructor(fullName, student_num, email, password, role) {
        this.fullName = fullName;
        this.student_num = student_num;
        this.email = email;
        this.password = password;
        this.role = role;

        User.userCount++;   // keeps track of how many users there are
    }

    // Setters
    setfullName(newFullName) {
        this.fullName = newFullName;
    }

    setstudentNum(newStudentNum) {
        this.student_num = newStudentNum;
    }

    setemail(newEmail) {
        this.email = newEmail;
    }

    setpassword(newPassword) {
        this.password = newPassword;
    }

    setrole(newRole) {
        this.role = newRole;
    }

    // Getters
    getFullName() {
        return this.fullName;
    }

    getStudentNum() {
        return this.student_num;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getRole() {
        return this.role;
    }

    // Display User info
    displayInfo() {
        console.log(`User's name: ${this.fullName}`);
        console.log(`User's email: ${this.email}`);
    }

    // Return data in json
    json() {
        return {
            fullName: this.fullName,
            student_num: this.student_num,
            email: this.email,
            password: this.password,
            role: this.role
        };
    }
}

export default User;