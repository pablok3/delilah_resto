const { products } = require("./data");
const productData = require('./data');
const { Product } = require('./model.js');



function checkIfProductExists(req, res, next) {
    const actualProductId = parseInt(req.params.productId);
    const findProduct = products.find(product => product.getProductId() === actualProductId);
    if (findProduct) {
        req.actualProductId = actualProductId;
        next();
    } else {
        res.status(404).json(
            {
                message: `Producto con ID: ${actualProductId}, no encontrado!`
            });
    }
}

function createProduct(req, res, next) {
    if (!req.adminFlag) {
        res.status(401).json(
            {
                message: "No tiene permisos para realizar ésta acción, contáctese con un administrador"
            });
    } else {
        const rq = req.body
        if (productData.products.find(product => product.getName() === rq.name)) {
            res.status(409).json(
                {
                    message: `El producto con nombre: ${rq.name}, ya existe! Elija otro nombre.`
                });
        } else {
            if (rq.price != 0) {
                if (rq.qty != 0) {
                    let newProduct = new Product(productData.products.length + 1, rq.name, rq.description, rq.price, rq.qty, rq.isActive);
                    productData.products.push(newProduct);
                    req.productName = rq.name;
                    return next();
                } else {
                    res.status(412).json(
                        {
                            message: `El producto debe contener al menos una unidad`
                        });
                }
            } else {
                res.status(411).json(
                    {
                        message: `El producto no puede tener un precio en cero`
                    });
            }
        }
    }
};

function modifyProduct(req, res, next) {
    if (!req.adminFlag) {
        res.status(401).json(
            {
                message: "No tiene permisos para realizar ésta acción, contáctese con un administrador"
            });
    } else {
        rq = req.body;
        const filterProduct = productData.products.filter(product => product.getProductId() === req.actualProductId);
        filterProduct[0].setName(rq.name);
        filterProduct[0].setDescription(rq.description);
        filterProduct[0].setPrice(rq.price);
        filterProduct[0].setQty(rq.qty);
        req.productName = rq.name;
        return next();
    }
};


function deleteProduct(req, res, next) {
    if (!req.adminFlag) {
        res.status(401).json(
            {
                message: "No tiene permisos para realizar ésta acción, contáctese con un administrador"
            });
    } else {
        const index = productData.products.findIndex(product => product.getProductId() === req.actualProductId);
        if (productData.products[index].isActive) {
            productData.products[index].isActive = false;
            req.actualProductId = req.actualProductId;
            req.productName = productData.products[index].name;
            return next();
        } else {
            res.status(400).json(
                {
                    error: `Producto con ID: ${req.actualProductId}, ${productData.products[index].name}, ya ha sido eliminado!`
                });
        }
    }
};


//................................................................................
module.exports = { checkIfProductExists, createProduct, modifyProduct, deleteProduct };