const { Product } = require("../product/model.js");

class Order {
    constructor(userId, orderId, products, totalToPay, hour, mPago, address, status) {
        this.userId = userId,
        this.orderId = orderId,
        this.products = products,
        this.totalToPay = totalToPay,
        this.hour = hour,
        this.mPago = mPago,
        this.address = address,
        this.status = status
    }


    getUserId() { return this.userId; }
    setUserId(userId) { this.userId = userId; }

    getOrderId() { return this.orderId; }
    setOrderId(orderId) { this.orderId = orderId; }

    getProducts() { return this.products; }
    setProducts(products) { this.products = products; }

    getTotalToPay() { return this.totalToPay; }
    setTotalToPay(totalToPay) { this.totalToPay = totalToPay; }

    getHour() { return this.hour; }
    setHour(hour) { this.hour = hour; }

    getOrderMpago() { return this.mPago; }
    setOrderMpago(mPago) { this.mPago = mPago; }

    getOrderAddress() { return this.address; }
    setOrderAddress(address) { this.address = address; }

    getOrderStatus() { return this.status; }
    setOrderStatus(status) { this.status = status; }

};

//................................................................................
module.exports = { Order };