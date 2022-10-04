const router = require('express').Router();

// Imports 
const authController = require('../../controllers/auth/auth');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;