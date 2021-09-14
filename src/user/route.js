const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
const { validateEmail, login, register } = require('./middleware');

//................................................................................


router.post('/login', login, (req, res) => {
    res.status(200).json(
        {
            message: `Bienvenido ${req.actualUser}, su ID es: ${req.Id}`
        });
})

router.post('/register', validateEmail, register, (req, res) => {
res.status(201).json(
    {
        message: `Usuario ${req.userName} creado!, su ID es ${req.Id}`
    });
});


//................................................................................
module.exports = router;