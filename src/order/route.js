const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();

const { orders } = require('./data');
const { checkForOrderPending, checkFields, createNewOrder, modifyOrder, deleteOrder, confirmOrder, changeOrderState } = require('./middleware');
const { IsUserAdmin, IsUserLogged } = require('../user/middleware');
const { listPaymentMethod } = require('../paymentM/middleware');



// Orders ....................................
// El cliente puede visualizar aquí su orden pendiente, mostrando el detalle de productos y total a pagar. 
router.get('/', IsUserLogged, IsUserAdmin, (req, res) => {
    const actualUser = parseInt(req.headers.userid);
    const filterOrders = orders.filter(order => order.getUserId() === actualUser);
    const findOrders = orders.find(order => order.getUserId() === actualUser);

    if (req.adminFlag) {
        if (orders.length > 0) {
            res.status(200).json(
                {
                    "total-users-orders": orders
                });
        } else {
            res.status(400).json(
                {
                    message: `No hay ordenes disponibles para mostrar`
                });
        }
    } else {
        if (findOrders) {
            res.status(200).json(
                {
                    orders: filterOrders
                });
        } else {
            res.status(400).json(
                {
                    message: `El usuario con ID: ${actualUser} no posee ninguna orden`
                });
        }
    }
});

// Si el cliente aun tiene una orden pendiente, los productos que adquiera, se sumaran a su orden actual. 
// si no, se le creara una orden nueva.
router.post('/', IsUserLogged, checkFields, createNewOrder, (req, res) => {
    if (!req.orderExists) {
        res.status(201).json(
            {
                message: `Productos añadidos a la orden con ID: ${req.findOrderId}`,
                products: req.productsList
            });
    } else {
        res.status(201).json(
            {
                message: `Productos añadidos a la orden con ID: ${req.filterPendingOrders[0].getOrderId()}`,
                products: req.productsList
            });
    }
});

// El cliente puede modificar su última orden pendiente, cambiando los productos y cantidades de la misma.
router.put('/', IsUserLogged, checkFields, modifyOrder, (req, res) => {
    res.status(201).json(
        {
            message: `Orden con ID: ${req.orderId}, del Usuario: ${req.user}, modificada!`,
            "order-modified": req.orderModified
        });
});

// El cliente puede eliminar su última orden si aún está pendiente. El administrador puede eliminar cualquier orden.
router.delete('/:orderId', IsUserLogged, IsUserAdmin, deleteOrder, (req, res) => {
    res.status(200).json(
        {
            message: `Orden con ID: ${req.orderId} eliminada!`
        });
});

router.patch('/:orderId', IsUserLogged, IsUserAdmin, changeOrderState, (req, res) => {
    res.status(201).json(
        {
            message: `Orden con ID: ${req.orderId} cambió al estado: ${req.orderState}`
        });
});


// Checkout - Confirm Order/s ............................... 
// El cliente puede aquí confirmar su orden, eligiendo un método de pago disponible y una dirección de envío. 
// Si no ingresa una dirección, se tomará la del registro del usuario.
router.post('/checkout', IsUserLogged, checkForOrderPending, listPaymentMethod, confirmOrder, (req, res) => {
    res.status(200).json(
        {
            message: `Todas sus órdenes han sido confirmadas`
        });
});


//....................................................................................
module.exports = router;