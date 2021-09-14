const express = require('express');
const router = express.Router();
const productData = require('./data');
const { Product } = require('./model.js');
const { IsUserAdmin, IsUserLogged } = require('../user/middleware');
const { checkIfProductExists, createProduct, modifyProduct, deleteProduct } = require('./middleware');


//................................................................................

// El administrador puede visualizar todos los productos, aun si fueron eliminados. El usuario comun 
// solo aquellos que esten activos.
router.get('/', IsUserLogged, IsUserAdmin, (req, res) => {
    if (req.adminFlag) {
        res.status(200).json(
            {
                "products": productData.products
            });
    } else {
        const filterActiveProducts = productData.products.filter(products => products.getIsActive() === true);
        res.status(200).json(
            {
                "products": filterActiveProducts
            });
    }
});

// No puede crearse un producto cuyo nombre ya exista. No puede ser asignada una cantidad y precio iguales a cero.
router.post('/', IsUserLogged, IsUserAdmin, createProduct, (req, res) => {
    res.status(201).json(
        {
            message: `Producto: ${req.productName}, creado!`
        });
});

// Toma el Id del producto a modificar por parametro. Luego toma los datos del body y los reemplaza por el producto
// encontrado con el Id del producto ingresado. Incluso puede volverse activo, colocando el estado isActive en true.
router.put('/:productId', IsUserLogged, IsUserAdmin, checkIfProductExists, modifyProduct, (req, res) => {
    res.status(201).json(
        {
            message: `Producto: ${req.productName}, modificado!`
        });
});

router.delete('/:productId', IsUserLogged, IsUserAdmin, checkIfProductExists, deleteProduct, (req, res) => {
    res.status(200).json(
        {
            message: `Producto con ID: ${req.actualProductId}, ${req.productName}, eliminado!`
        });
});



//................................................................................
module.exports = router;