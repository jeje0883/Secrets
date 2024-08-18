const bcrypt = require('bcrypt');
const { errorHandler } = require('../utils/errorhandler');

module.exports.adminHome = (req, res) => {
    return res.send("you have authenticated");
}