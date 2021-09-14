const userModel = require('../user/model');

let adminUser = new userModel.User(1, "admin", "Pablo", "Secolo", "123456", "pablok3_2006@hotmail.com", 123456, "San Martin 220");

adminUser.setIsAdmin(true);

const users = [];
users.push(adminUser);

//................................................................................
module.exports = { users };



