const express = require('express');
const homeController = require('../controllers/homeController');
const { verify } = require('../auth/auth');

const router = express.Router();

router.get('/', homeController.home);

module.exports = router;
