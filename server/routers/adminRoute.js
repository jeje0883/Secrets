const express = require('express');
const { verify, verifyAdmin } = require('../auth/auth');

const app = express();

const Post = require('../models/Post');
const auth = require('../auth/auth');
const adminController = require('../controllers/adminController');

const router =express.Router();

router.get('/', verify, verifyAdmin, adminController.adminHome);

module.exports = router;