const { paymentMethods } = require("../paymentM/data");
const { products } = require("../product/data");
const { users } = require("../user/data");
const { orders, orderStatus } = require("./data");
const { Order } = require("./model");
const moment = require('moment');
const dateFormat = "hh:ss A";
const orderTime = moment().locale('es').format(dateFormat);
//................................................................................




function checkFields(req, res, next) {
    const productsListToAdd = req.body.products
    for (key of productsListToAdd) {
        if (key.productId == 0) {
            return res.status(404).json(
                {
                    message: "Verifique que ningún ID de producto este en cero ",
                })
        } else {

            if (key.qty == 0) {
                return res.status(412).json(
                    {
                        message: "Verifique que ninguna cantidad este en cero ",
                    })
            }
        }
    }
    next()
}

function checkForOrderPending(req, res, next) {
    const actualUser = parseInt(req.headers.userid);
    const filterOrderbyId = orders.filter(order => order.getUserId() === actualUser);
    const filterOrderByState = filterOrderbyId.find(status => status.getOrderStatus() === "Pendiente");

    if (!filterOrderByState) {
        res.status(400).json(
            {
                message: "Carrito vacío"
            });
    } else {
        req.filterOrderbyId = filterOrderbyId;
        next();
    };
};

function createNewOrder(req, res, next) {
    const rq = req.body;
    const actualUser = parseInt(req.headers.userid);
    const findOrderId = orders.length + 1;
    if (!findOrderId) {
        orderId = 1;
    };
    const actualUserData = users.filter(user => user.getUserId() === actualUser);
    const filterUserOrders = orders.filter(order => order.getUserId() === actualUser);
    const filterPendingOrders = filterUserOrders.filter(status => status.getOrderStatus() === "Pendiente");
    const filterOrderByState = filterUserOrders.find(order => order.getOrderStatus() === "Pendiente");
    let newProductsToAdd = [];
    let productsList = [];
    let totalPrice = 0;


    if (!filterOrderByState) {
        for (i = 0; i < rq.products.length; i++) {
            if (rq.products[i].productId > 0 && rq.products[i].productId <= products.length) {
                newProductsToAdd = products.filter(product => product.getProductId() === rq.products[i].productId);
                newProductsToAdd[0].setQty(rq.products[i].qty);
                productsList.push(newProductsToAdd[0]);
            } else {
                return res.status(404).json(
                    {
                        message: " El ID del producto ingresado no pertenece a un producto disponible ",
                    })
            }
        };
        productsList.forEach(function (product) {
            totalPrice += product.getPrice() * product.getQty();
        });
        let newOrder = new Order(actualUser, findOrderId, productsList, totalPrice, orderTime, "Efectivo", actualUserData[0].getAddress(), "Pendiente");
        orders.push(newOrder)
        req.findOrderId = findOrderId;
        req.productsList = productsList;
        next()

    } else {
        let productsList = [];
        let totalPrice2 = 0;
        for (i = 0; i < rq.products.length; i++) {
            if (rq.products[i].productId > 0 && rq.products[i].productId <= products.length) {
                newProductsToAdd = products.filter(product => product.getProductId() === rq.products[i].productId);
                newProductsToAdd[0].setQty(rq.products[i].qty);
                productsList.push(newProductsToAdd[0]);
                filterPendingOrders[0].getProducts().push(productsList[i]);
            } else {
                return res.status(404).json(
                    {
                        message: " El ID del producto ingresado no pertenece a un producto disponible ",
                    })
            }
        };
        productsList.forEach(function (product) {
            totalPrice2 += product.getPrice() * product.getQty();
        });
        const newTotalToPay = filterPendingOrders[0].getTotalToPay() + totalPrice2;
        filterPendingOrders[0].setTotalToPay(newTotalToPay);
        filterPendingOrders[0].setHour(orderTime);
        req.orderExists = true;
        req.findOrderId = findOrderId;
        req.productsList = productsList;
        req.filterPendingOrders = filterPendingOrders;
        next()
    };
}

function modifyOrder(req, res, next) {
    const rq = req.body;
    const actualUser = parseInt(req.headers.userid);
    const filterUserOrders = orders.filter(order => order.getUserId() === actualUser);
    const filterPendingOrder = filterUserOrders.filter(status => status.getOrderStatus() === "Pendiente");
    const pendingOrderFlag = filterUserOrders.find(order => order.getOrderStatus() === "Pendiente");
    let productsToModify = [];
    let orderModified = [];
    let totalPriceModif = 0;

    if (pendingOrderFlag) {
        for (i = 0; i < rq.products.length; i++) {
            productsToModify = products.filter(product => product.getProductId() === rq.products[i].productId);
            productsToModify[0].setQty(rq.products[i].qty);
            orderModified.push(productsToModify[0]);
        };

        orderModified.forEach(function (product) {
            totalPriceModif += product.getPrice() * product.getQty();
        });

        filterPendingOrder[0].setTotalToPay(totalPriceModif);
        filterPendingOrder[0].setProducts(orderModified);
        filterPendingOrder[0].setHour(orderTime);
        req.orderId = filterPendingOrder[0].getOrderId();
        req.user = users[actualUser - 1].getUserName();
        req.orderModified = orderModified;
        return next();
    } else {

        res.status(400).json(
            {
                message: `El usuario ${users[actualUser - 1].getUserName()}, con ID: ${actualUser}, no posee una orden pendiente para modificar`
            });
    };
};

function deleteOrder(req, res, next) {
    const actualUser = parseInt(req.headers.userid);
    const actualOrderId = parseInt(req.params.orderId);

    if (actualOrderId === 0 || actualOrderId > orders.length) {
        res.status(400).json(
            {
                message: `La orden con ID: ${actualOrderId}, no existe!`
            });
    } else {
        if (req.adminFlag) {
            const orderToDelete = orders.findIndex(order => order.getOrderId() === actualOrderId)
            orders.splice(orderToDelete, 1);
            req.orderId = actualOrderId;
            return next();
        } else {
            const actualUserOrders = orders.filter(order => order.getUserId() === actualUser);
            const checkOrderInActualUser = actualUserOrders.find(order => order.getOrderId() === actualOrderId);
            const orderToDelete = orders.findIndex(order => order.getOrderId() === actualOrderId);

            if (!checkOrderInActualUser) {
                res.status(400).json(
                    {
                        message: `La orden con ID: ${actualOrderId}, no existe!`
                    });
            } else {
                if (checkOrderInActualUser.getOrderStatus() === "Pendiente") {
                    orders.splice(orderToDelete, 1);
                    req.orderId = actualOrderId;
                    return next();
                } else {
                    res.status(400).json(
                        {
                            message: `La orden con ID: ${actualOrderId}, no está pendiente!`
                        });
                }
            }
        }
    }
};

function confirmOrder(req, res, next) {
    const actualUser = parseInt(req.headers.userid);
    const actualUserData = users.filter(user => user.getUserId() === actualUser);
    const filterOrder = req.filterOrderbyId.filter(status => status.getOrderStatus() === "Pendiente");
    const filterPaymentM = paymentMethods.filter(checkMethod => checkMethod.getMethodId() === req.body.paymentMethodId);

    filterOrder[0].setOrderStatus("Confirmado");
    filterOrder[0].setOrderMpago(filterPaymentM[0].getPayMDescription());

    if (req.body.address === "") {
        filterOrder[0].setOrderAddress(actualUserData[0].getAddress());
    } else {
        filterOrder[0].setOrderAddress(req.body.address);
    }
    next();
};

function changeOrderState(req, res, next) {
    const actualOrderState = req.body.order_status;
    const actualOrderId = parseInt(req.params.orderId);
    const changeOrderState = orders.filter(order => order.getOrderId() === actualOrderId);

    if (req.adminFlag) {
        if (orders.length > 0 && actualOrderId <= orders.length && changeOrderState[0]) {
            changeOrderState[0].setOrderStatus(actualOrderState);
            req.orderId = actualOrderId;
            req.orderState = actualOrderState;
            return next();
        } else {
            res.status(400).json(
                {
                    message: `La orden con ID: ${actualOrderId}, no está disponible.`
                });
        }
    } else {
        res.status(401).json(
            {
                message: `No tiene permisos para realizar ésta operación.`
            });
    }
};

function checkOrderStatusInput(req, res, next) {
    const actualOrderStatus = req.body.order_status;
    const findOrderStatus = orderStatus.find(status => status == actualOrderStatus);

    if (findOrderStatus) {
        return next();
    } else {
        return res.status(404).json(
            {
                message: `El estado: ${actualOrderStatus}, no está disponible, elija alguno de los siguientes:`,
                orderStatus
            });
    }
};

//................................................................................
module.exports = { checkForOrderPending, checkFields, createNewOrder, modifyOrder, deleteOrder, confirmOrder, changeOrderState, checkOrderStatusInput };

