const router = require('express').Router();
const userController = require('../../controllers/user/user');
// Update user
router.put('/:id', userController.update);
// Delete user
router.delete('/:id', userController.delete);
// Get a user
router.get('/:id', userController.view);
// Follow user
// Unfollow user

module.exports = router;
