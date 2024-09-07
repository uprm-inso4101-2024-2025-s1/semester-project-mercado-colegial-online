import User from "./index.js";

class Buyer extends User{
    constructor({fullName, username, email, password, phone, shippingAddress, purchaseHistory}){
        super(fullName, username, email, phone, password);
        this.shippingAddress = shippingAddress; // buyer specific
        this.purchaseHistory = purchaseHistory; // buyer specific
    }
    getShippingAddress(){
        return this.shippingAddress;
    }
    setShippingAddress(newShippingAddress){
        this.shippingAddress = newShippingAddress;
    }
    getPurchaseHistory(){
        return this.purchaseHistory;
    }
    setPurchaseHistory(newPurchaseHistory){
        this.purchaseHistory = newPurchaseHistory;
    }
    displayInfo(){
        super.displayInfo();
        console.log(`Shipping Address: ${this.shippingAddress}`);
        console.log(`Purchase History: ${this.purchaseHistory.join(', ')}`); // for purchaseHistory as an array
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
        purchaseHistory: document.getElementById("myPurchaseHistory").value.split(",")
    };

    // New Buyer instance
    const buyer1 = new Buyer(buyerData);
    buyer1.displayInfo();
};
export default Buyer;