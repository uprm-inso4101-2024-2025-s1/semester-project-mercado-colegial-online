import User from "./index.js";
class Seller extends User {
    constructor({fullName, username, email, phone, password, address, shopName, productList}) {
        super(fullName, username, email, phone, password)
       this.address = address; // seller specific
       this.shopName = shopName; // seller specific
       this.productList = productList; // seller specific
   }
   getShopName(){
       return this.shopName;
   }
   setShopName(newShopName){
       this.shopName = newShopName;
   }
   getAddress(){
       return this.address;
   }
   setAddress(newAddress){
       this.address = newAddress;
   }
   getProductList(){
       return this.productList;
   }
   setProductList(newProductList){
       this.productList = newProductList;
   }
   displayInfo(){
       super.displayInfo();
       console.log(`Shop: ${this.shopName}`);
       console.log(`Shop's Address: ${this.address}`);
       console.log(`Products: ${this.productList.join(', ')}`); // if products are in an array
   }
}


document.getElementById("mySubmit").onclick = function() {
    const sellerData = {
        fullName: document.getElementById("myName").value,
        username: document.getElementById("myUsername").value,
        email: document.getElementById("myEmail").value,
        phone: document.getElementById("myPhone").value,
        password: document.getElementById("myPassword").value,
        shopName: document.getElementById("myStoreName").value,
        address: document.getElementById("myAddress").value,
        productList: document.getElementById("myProductList").value.split(",")
    };

    // New Seller instance
    const seller1 = new Seller(sellerData);
    seller1.displayInfo();
};
export default Seller;