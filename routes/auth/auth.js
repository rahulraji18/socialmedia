const router = require('express').Router();

// Imports 
const authController = require('../../controllers/auth/auth');

router.post('/register', authController.register);

module.exports = router;