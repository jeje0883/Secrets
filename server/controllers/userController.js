const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../auth/auth');
const { errorHandler } = require('../utils/errorhandler');
//const { errorHandler } = require ('../auth/auth');

module.exports.registerUser = (req, res) => {

    //validate email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof req.body.email !== "string" || !emailRegex.test(req.body.email)) {
        return res.status(400).send({ message: 'Invalid email address. Please check the details and try again.' });
    }
    
    //console.log(req.body);
    let newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });

    return newUser.save()
    .then((result) => res.send(result))
    .catch(error => errorHandler (error, req, res)); 
}

module.exports.userLogin = (req, res) => {

    if (typeof req.body.email !== "string" || !emailRegex.test(req.body.email)) {
        return res.status(400).send({ message: 'Invalid email address. Please check the details and try again.' });
    }


    return User.findOne({email : req.body.email})
        .then((result) => {
            if (!result) {
                res.status(401).send({ message: 'Invalid email' });
            }
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

            if (isPasswordCorrect) {
                res.send({ access: auth.createAccessToken(result) });
            } else {
                res.status(401).send({ error: 'Invalid password' });
            }})
            .catch(error => errorHandler (error, req, res));
}



module.exports.getUsers = (req, res) => {
    console.log(req);
    return User.find()
    .then((users) => res.send(users))
    .catch(error => errorHandler (error, req, res));
}
