// Dependencies ....................................................................
const config = require('./config');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const app = express();
app.use(compression());
app.use(express.json());
app.use(cors());

// Routes ....................................................................
const userRoute = require('./user/route');
const productRoute = require('./product/route');
const orderRoute = require('./order/route');
const payMethodsRoute = require('./paymentM/route');

// Endpoints....................................................................

app.use('/', userRoute);
app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/orders/checkout', orderRoute);
app.use('/paymentMethods', payMethodsRoute);


// Ports...............................................................
app.listen(config.port, () => console.log(`Escuchando puerto: ${config.port}`))