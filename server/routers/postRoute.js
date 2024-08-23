const express = require('express');
const postController = require('../controllers/postController');
const { verify } = require('../auth/auth');

const router = express.Router();

router.get('/', postController.getPosts);

router.post('/', verify, postController.createPost);

module.exports = router;