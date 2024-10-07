class Product {
    static itemCount = 0;

    // Private fields
    #itemId;
    #itemName;
    #price;
    #stockQuantity;
    #description;
    #keywords = [];



    constructor(itemName, price, stockQuantity, description = ''){
        this.#itemName = itemName;
        this.#price = price;
        this.#stockQuantity = stockQuantity;
        this.#description = description; // Defaults to an empty string if not provided
        this.#itemId = Product.itemCount;

        Product.itemCount++;
    }
    


    // Setters
    set setItemName(newItemName){
        this.#itemName = newItemName;
    }

    set setPrice(newPrice){
        this.#price = newPrice;
    }

    set setStockQuantity(newStockQuantity){
        this.#stockQuantity = newStockQuantity;
    }

    set setDescription(newDescription){
        this.#description = newDescription;
    }


    // Getters
    get getItemId(){
        return this.#itemId;
    }

    get getItemName(){
        return this.#itemName;
    }

    get getPrice(){
        return this.#price;
    }

    get getStockQuantity(){
        return this.#stockQuantity;
    }

    get getDescription(){
        return this.#description;
    }

    get getKeywords(){
        return this.#keywords;
    }



    // Method to add a new keyword
    addKeyword(newKeyword){
        this.#keywords.push(newKeyword);
    }

    // Method to remove a keyword
    removeKeyword(removedKeyword){
        const removedKeywordIndex = this.#keywords.indexOf(removedKeyword);
        if(removedKeywordIndex != -1){
            this.#keywords.splice(removedKeywordIndex, 1);
        }
    }


    // Display product info
    displayInfo() {
        console.log(`Product ID: ${this.#itemId}`);
        console.log(`Product Name: ${this.#itemName}`);
        console.log(`Price: $${this.#price}`);
        console.log(`Stock Quantity: ${this.#stockQuantity}`);
        console.log(`Description: ${this.#description}`);
        console.log(`Keywords: ${this.#keywords.length > 0 ? this.#keywords.join(', ') : 'No keywords'}`);
    }

    // Return data in JSON format
    json() {
        return {
            itemId: this.#itemId,
            itemName: this.#itemName,
            price: this.#price,
            stockQuantity: this.#stockQuantity,
            description: this.#description,
            keywords: this.#keywords
        };
    }

}