var router = require('express').Router();

// USER ROUTE
router.use('/user', require('./users/users'));

// AUTH ROUTE
router.use('/auth', require('./auth/auth'));

// POST ROUTE
router.use('/post', require('./post/post'));

module.exports = router;
