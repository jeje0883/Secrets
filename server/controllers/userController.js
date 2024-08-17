const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../auth/auth');
const { errorHandler } = require('../utils/errorhandler');
//const { errorHandler } = require ('../auth/auth');

module.exports.registerUser = (req, res) => {
    //console.log(req.body);
    let newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });

    return newUser.save()
    .then((result) => res.send(result))
    .catch(error => errorHandler (error, req, res)); 
}

module.exports.getUsers = (req, res) => {
    //console.log('getUsers');
    return User.find()
    .then((users) => res.send(users))
    .catch(error => errorHandler (error, req, res));
}
