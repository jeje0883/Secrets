const express = require('express');
const userController = require('../controllers/userController');
const { verify } = require('../auth/auth');

const router = express.Router();

router.get('/', userController.getUsers);

router.post('/register', userController.registerUser);

router.post('/login', userController.userLogin);

// router.get('/logout', verify, userController.logout);

// router.get('/profile', verify, userController.profile);

module.exports = router;