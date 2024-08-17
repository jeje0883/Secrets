const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../auth/auth');
const { errorHandler } = require('../utils/errorhandler');
const path = require('path');

module.exports.home = (req, res) => {
    const secretDir = path.join(__dirname, '../../');
    const filePath = path.join(secretDir, '/client/public/index.html');
    res.sendFile(filePath);
}