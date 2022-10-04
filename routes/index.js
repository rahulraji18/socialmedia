var router = require('express').Router();

// USER ROUTE
router.use('/user', require('./users/users'));

// AUTH ROUTE
router.use('/auth', require('./auth/auth'));

module.exports = router;
