const bcrypt = require('bcrypt');
const User = require('../models/User');
const Post = require('../models/Post');
const auth = require('../auth/auth');
const { errorHandler } = require('../utils/errorhandler');
//const { errorHandler } = require ('../auth/auth');

module.exports.getPosts = (req, res) => {
    //console.log('getUsers');
    return Post.find()
    .limit(10)
    .then((result) => res.send(result))
    .catch(error => errorHandler (error, req, res));
}

module.exports.createPost = (req, res) => {
    //console.log('createPost');
    const post = new Post(req.body);
    return post.save()
   .then((result) => res.send(result))
}