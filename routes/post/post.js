const router = require('express').Router();
const postController = require('../../controllers/post/post');

//create post
router.post('/', postController.create )
//update post
router.put('/:id',postController.update )
//delete post
router.delete('/:id', postController.delete )
//like/dislike a post
router.put('/:id/like', postController.likeDislike )
//get a post
router.get('/:id', postController.getPost )
//get timeline post
router.get('/timeline/all', postController.timelineAll )

module.exports = router;