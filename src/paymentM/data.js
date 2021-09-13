const payMethodsModel = require('./model');

const paymentMethods = [];

let paymentMethod1 = new payMethodsModel.PaymentMethod(1, "Tarjeta de Debito");
let paymentMethod2 = new payMethodsModel.PaymentMethod(2, "Tarjeta de Credito");
let paymentMethod3 = new payMethodsModel.PaymentMethod(3, "Transferencia");
let paymentMethod4 = new payMethodsModel.PaymentMethod(4, "Efectivo");


paymentMethods.push(paymentMethod1, paymentMethod2, paymentMethod3, paymentMethod4);


//................................................................................
module.exports = { paymentMethods };
