const express = require('express');
const postController = require('../controllers/postController');
const { verify } = require('../auth/auth');

const router = express.Router();

router.get('/', postController.getPosts);

module.exports = router;