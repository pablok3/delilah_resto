const userData = require('./data');
const { User } = require('./model');



function validateEmail(req, res, next) {
    const actualEmail = req.body.email;
    const findUser = userData.users.find(user => user.getEmail() == actualEmail);
    if (findUser == undefined) {
        next();
    } else {
        res.status(400).json(
            {
                error: `El email: ${actualEmail} ya se encuentra registrado`
            });
    };
};

function IsUserLogged(req, res, next) {
    const actualUser = parseInt(req.headers.userid);

    const filterUser = userData.users.find(user => user.getUserId() === actualUser);
    if (filterUser) {
        if (filterUser.getIsLogged()) {
            next();
        } else {
            res.status(401).json(
                {
                    error: `El usuario con ID: ${actualUser} no se encuentra logeado`
                });
        };
    } else {
        res.status(404).json(
            {
                error: `El usuario con ID: ${actualUser} no se encuentra registrado`
            });
    };
};

function IsUserAdmin(req, res, next) {
    let adminFlag = false;
    const actualUser = parseInt(req.headers.userid);

    const filterUser = userData.users.find(user => user.getUserId() === actualUser);
    if (filterUser != undefined) {
        if (filterUser.getIsAdmin()) {
            adminFlag = true;
            req.adminFlag = adminFlag;
            next();
        } else {
            adminFlag = false;
            req.adminFlag = adminFlag;
            next();
        }
    } else {
        res.status(404).json(
            {
                error: `El Usuario con ID: ${actualUser} no ha sido encontrado!`
            });
    }
};

function login(req, res, next) {
    const actualUserOrEmail = req.body.userName_email;
    const actualPass = req.body.password;

    if (req.body.userName_email != "" && req.body.password != "") {
        const filterUser = userData.users.find(user => user.getUserName() === actualUserOrEmail || user.getEmail() === actualUserOrEmail);
        if (!filterUser) {
            res.status(404).json(
                {
                    error: `El usuario ${actualUserOrEmail} no se encuentra registrado`
                });
        } else {
            if (filterUser.getUserPass() === actualPass) {
                filterUser.setIsLogged(true);
                req.actualUser = actualUserOrEmail;
                req.Id = filterUser.getUserId();
                return next();
            } else {
                res.status(401).json(
                    {
                        message: `La contraseña ingresada es incorrecta`
                    });
            }
        }
    } else {
        res.status(400).json(
            {
                message: `Complete todos los campos!`
            });
    }
};

function register(req, res, next) {
    const rq = req.body;
    newID = userData.users.length + 1;
    if (rq.password == rq.repeatPass) {
        let newUser = new User(newID, rq.userName, rq.firstName, rq.lastName, rq.password, rq.email, rq.phone, rq.address);
        userData.users.push(newUser);
        req.userName = rq.userName;
        req.Id = newID;
        return next();
    }
    else {
        res.status(400).json(
            {
                message: `Ambas contraseñas deben coincidir!, Pruebe de nuevo`
            });
    };
};


//................................................................................
module.exports = { IsUserAdmin, IsUserLogged, validateEmail, login, register };