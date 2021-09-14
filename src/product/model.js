class Product {
    constructor(productId, name, description, price, qty) {
        this.productId = productId,
        this.name = name,
        this.description = description,
        this.price = price,
        this.qty = qty,
        this.isActive = true
    }

    getProductId() { return this.productId };
    setProductId(productId) { this.productId = productId };

    getName() { return this.name };
    setName(name) { this.name = name };

    getDescription() { return this.description };
    setDescription(description) { this.description = description };

    getPrice() { return this.price };
    setPrice(price) { this.price = price };

    getQty() { return this.qty };
    setQty(qty) { this.qty = qty };

    getIsActive() { return this.isActive };
    setIsActive(isActive) { this.isActive = isActive };

};

//................................................................................
module.exports = { Product };