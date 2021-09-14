class User {
    constructor(userId, userName, firstName, lastName, password, email, phone, address) {
        this.userId = userId,
        this.userName = userName,
        this.firstName = firstName,
        this.lastName = lastName,
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.isLogged = false;
        this.isAdmin = false;
        this.isActive = true
    }

    getUserId() { return this.userId; }
    setUserId(userId) { this.userId = userId; }

    getUserName() { return this.userName; }
    setUserName(userName) { this.userName = userName; }

    getUserPass() { return this.password; }
    setUserPass(password) { this.password = password; }

    getEmail() { return this.email; }
    setEmail(email) { this.email = email; }

    getAddress() { return this.address; }
    setAddress(address) { this.address = address; }

    getIsAdmin() { return this.isAdmin };
    setIsAdmin(isAdmin) { this.isAdmin = isAdmin }

    getIsLogged() { return this.isLogged }
    setIsLogged(isLogged) { this.isLogged = isLogged }

    getIsActive() { return this.IsActive }
    setIsActive(IsActive) { this.IsActive = IsActive }
};


//................................................................................
module.exports = { User };