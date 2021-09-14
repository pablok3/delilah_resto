const { paymentMethods } = require("./data");


function listPaymentMethod(req, res, next) {
    const paymMId = req.body.paymentMethodId;
    const findPaymentM = paymentMethods.find(checkPayMethod => checkPayMethod.getMethodId() == paymMId);

    if (!findPaymentM) {
        res.status(404).json(
            {
                error: `Método de pago con ID: ${paymMId} no registrado. Elija alguno de los siguientes métodos de pago:`,
                message: paymentMethods
            });
    } else {
        next();
    };
};

function checkForPaymMethod(req, res, next) {
    const newPayMDesc = req.body.description;
    const findPaymentM = paymentMethods.find(paymMethod => paymMethod.description === newPayMDesc);
    if (!findPaymentM) {
        next();
    } else {
        res.status(400).json(
            {
                error: `Método de pago: ${newPayMDesc}, ya se encuentra registrado.`
            });
    };
};

function modifyPaymMethod(req, res, next) {
    if (!req.adminFlag) {
        res.status(401).json(
            {
                message: "No tiene permisos para realizar ésta acción, contáctese con un administrador"
            });
    } else {
        const paymMId = parseInt(req.params.paymMId);
        const rq = req.body;
        const findPaymM = paymentMethods.find(method => method.getMethodId() === paymMId);
        const filterPaymM = paymentMethods.filter(method => method.getMethodId() === paymMId);
        if (!findPaymM) {
            res.status(404).json(
                {
                    message: `No se encuentra el método de pago con ID: ${paymMId}`
                });
        } else {
            filterPaymM[0].setPayMDescription(rq.description);
            req.paymMId = paymMId;
            return next();
        }
    }
};

function deletePaymMethod(req, res, next) {
    if (!req.adminFlag) {
        res.status(401).json(
            {
                message: "No tiene permisos para realizar ésta acción, contáctese con un administrador"
            });
    } else {
        const paymMId = parseInt(req.params.paymMId);
        const findPaymM = paymentMethods.find(method => method.getMethodId() === paymMId);
        const indexPaymM = paymentMethods.findIndex(method => method.getMethodId() === paymMId);
        if (!findPaymM) {
            res.status(400).json(
                {
                    message: `No se encuentra el método de pago con ID: ${paymMId}`
                });
        } else {
            paymentMethods.splice(indexPaymM, 1);
            req.paymMId = paymMId;
            return next();
        }
    }
};

//................................................................................
module.exports = { checkForPaymMethod, listPaymentMethod, modifyPaymMethod, deletePaymMethod };