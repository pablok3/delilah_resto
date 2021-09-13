const { Product } = require("./model");
const productModel = require('./model');

const products = [];


let product1 = new productModel.Product(1, "Hamburguesa", "Hamburguesa de carne, doble queso, con cebolla", 700, 1);
let product2 = new productModel.Product(2, "Pizza Napolitana", "Pizza con tomate, ajo y oregano", 600, 1);
let product3 = new productModel.Product(3, "Lomito Completo", "Sanguche de lomo, con jamon y queso, huevo y cebolla", 750, 1);
let product4 = new productModel.Product(4, "Empanada de Carne x Unidad", "Relleno de carne, con cebolla, huevo y aceitunas", 80, 1);
let product5 = new productModel.Product(5, "Picada Caliente", "Albondigas de carne, pollo frito, tortilla española", 1000, 1);

products.push(product1, product2, product3, product4, product5);



module.exports = { products };
