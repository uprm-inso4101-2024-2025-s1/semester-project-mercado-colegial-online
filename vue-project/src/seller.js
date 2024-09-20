import User from "./user.js";

class Seller extends User {
    static sellerCount = 0;  // Counter for sellers

    constructor({ fullName, username, email, phone, password, address, shopName }) {
        super(fullName, username, email, phone, password);
        this.address = address;   // seller-specific
        this.shopName = shopName; // seller-specific
        this.productList = [];    // Start with an empty product list
        Seller.sellerCount++;     // Increment seller count
    }

    // Getter and Setter for shop name
    getShopName() {
        return this.shopName;
    }

    setShopName(newShopName) {
        this.shopName = newShopName;
    }

    // Getter and Setter for address
    getAddress() {
        return this.address;
    }

    setAddress(newAddress) {
        this.address = newAddress;
    }

    // Getter for product list
    getProductList() {
        return this.productList;
    }

    // Add product to product list
    addProduct(product) {
        this.productList.push(product);  // Add product to the list
        console.log(`${product} has been added to your product list.`);
    }

    // Set a new product list (optional)
    setProductList(newProductList) {
        this.productList = newProductList;
    }

    // Override displayInfo to include Seller-specific info
    displayInfo() {
        super.displayInfo();  // Call parent method to display basic user info
        console.log(`Shop: ${this.shopName}`);
        console.log(`Shop's Address: ${this.address}`);
        console.log(`Products: ${this.productList.length > 0 ? this.productList.join(', ') : 'No products available'}`);
    }

    // JSON export method, similar to User and Buyer
    json() {
        const userData = super.json();  // Get the JSON data from the parent User class
        return {
            ...userData,
            shopName: this.shopName,
            address: this.address,
            productList: this.productList
        };
    }

    // Static method to get the seller count
    static getSellerCount() {
        return Seller.sellerCount;
    }
}

// Example usage for handling form input and creating a Seller

document.getElementById("mySubmit").onclick = function () {
    const sellerData = {
        fullName: document.getElementById("myName").value,
        username: document.getElementById("myUsername").value,
        email: document.getElementById("myEmail").value,
        phone: document.getElementById("myPhone").value,
        password: document.getElementById("myPassword").value,
        shopName: document.getElementById("myStoreName").value,
        address: document.getElementById("myAddress").value,
    };

    // New Seller instance
    const seller1 = new Seller(sellerData);
    seller1.displayInfo();

    // Adding products to seller's product list after initialization
    seller1.addProduct("Laptop");
    seller1.addProduct("Smartphone");

    // Display updated seller info with products
    seller1.displayInfo();

    // Export seller data as JSON
    console.log(seller1.json());
};

export default Seller;