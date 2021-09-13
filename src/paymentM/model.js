class PaymentMethod {
    constructor(methodId, description) {
        this.methodId = methodId,
        this.description = description
    }

    getMethodId() { return this.methodId; }
    setMethodId(methodId) { this.methodId = methodId; }

    getPayMDescription() { return this.description; }
    setPayMDescription(description) { this.description = description; }
};

//................................................................................
module.exports = { PaymentMethod };