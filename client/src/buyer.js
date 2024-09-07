import User from "./index.js";

class Buyer extends User {
    static buyerCount = 0;  // Counter for buyers

    constructor({fullName, username, email, password, phone, shippingAddress}) {
        super(fullName, username, email, phone, password);
        this.shippingAddress = shippingAddress; // buyer specific
        this.purchaseHistory = [];  // Start with an empty purchase history
        Buyer.buyerCount++;  // Increment buyer count
    }
    getShippingAddress() {
        return this.shippingAddress;
    }
    setShippingAddress(newShippingAddress) {
        this.shippingAddress = newShippingAddress;
    }
    getPurchaseHistory() {
        return this.purchaseHistory;
    }
    buy(item) {
        this.purchaseHistory.push(item);  // Adds item to purchase history
        console.log(`${item} has been added to your purchase history.`);
    }
    displayInfo() {
        super.displayInfo(); // Call parent method to display basic user info
        console.log(`Shipping Address: ${this.shippingAddress}`);
        console.log(`Purchase History: ${this.purchaseHistory.length > 0 ? this.purchaseHistory.join(', ') : 'No purchases yet'}`);
    }
    json() {
        const userData = super.json();  // Get the JSON data from the parent User class
        return {
            ...userData,
            shippingAddress: this.shippingAddress,
            purchaseHistory: this.purchaseHistory
        };
    }
    static getBuyerCount() {
        return Buyer.buyerCount;
    }
}
document.getElementById("mySubmit").onclick = function() {
    const buyerData = {
        fullName: document.getElementById("myName").value,
        username: document.getElementById("myUsername").value,
        email: document.getElementById("myEmail").value,
        phone: document.getElementById("myPhone").value,
        password: document.getElementById("myPassword").value,
        shippingAddress: document.getElementById("myShippingAddress").value,
    };

    // New Buyer instance
    const buyer1 = new Buyer(buyerData);
    buyer1.displayInfo();
};
export default Buyer;