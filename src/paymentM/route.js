const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());

const { paymentMethods } = require('./data');
const payMethodsModel = require('./model');
const { deletePaymMethod, checkForPaymMethod, modifyPaymMethod } = require('./middleware');
const { IsUserAdmin, IsUserLogged } = require('../user/middleware');

//........................................................................

router.get('/', IsUserLogged, IsUserAdmin, (req, res) => {
    if (!req.adminFlag) {
        res.status(401).json(
            {
                message: "No tiene permisos para realizar ésta acción, contáctese con un administrador"
            });
    } else {
        if (paymentMethods.length > 0) {
            res.status(200).json(
                {
                    "payment-methods": paymentMethods
                });
        } else {
            res.status(400).json(
                {
                    message: "No hay métodos de pago disponibles"
                });
        }
    }
});

router.post('/', IsUserLogged, IsUserAdmin, checkForPaymMethod, (req, res) => {
    if (!req.adminFlag) {
        res.status(401).json(
            {
                message: "No tiene permisos para realizar ésta acción, contáctese con un administrador"
            });
    } else {
        const newPaymentMethod = new payMethodsModel.PaymentMethod(paymentMethods.length + 1, req.body.description)
        paymentMethods.push(newPaymentMethod);

        res.status(201).json(
            {
                message: `Método de pago: ${newPaymentMethod.getPayMDescription()}, agregado!, ID: ${paymentMethods.length}`
            });
    }
});

router.put('/:paymMId', IsUserLogged, IsUserAdmin, checkForPaymMethod, modifyPaymMethod, (req, res) => {
    res.status(201).json(
        {
            message: `Método de pago con ID: ${req.paymMId} , modificado!`
        });
});

router.delete('/:paymMId', IsUserLogged, IsUserAdmin, deletePaymMethod, (req, res) => {
    res.status(200).json(
        {
            message: `Método de pago con ID: ${req.paymMId} , eliminado!`
        });
});


//........................................................................
module.exports = router;