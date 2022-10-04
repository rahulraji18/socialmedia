const router = require('express').Router();
const userController = require('../../controllers/user/user');
// Update user
router.put('/:id', userController.update);
// Delete user
router.delete('/:id', userController.delete);
// Get a user
router.get('/:id', userController.view);
// Follow user
router.put('/:id/follow', userController.follow);
// Unfollow user
router.put('/:id/unfollow', userController.unfollow);

module.exports = router;
