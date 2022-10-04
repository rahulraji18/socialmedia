const postModel = require('../../db/models/post');
const userModel = require('../../db/models/user');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const ErrorHandler = require('../../utils/ErrorHandling')
const createHttpError = require('http-errors');

exports.create = catchAsyncError(async (req,res,next) => {
    const post = new postModel(req.body);
    const savePost = await post.save();
    res.status(200).json(savePost);
})

exports.update = catchAsyncError(async (req,res,next) => {
    const post = await postModel.findById(req.params.id)
    if(post.userId === req.body.userId) {
        await post.updateOne({$set: req.body})
        res.status(200).json('The post has been updated')
    }
    else{
        res.status(403).json('You can update only your post')
    }
})

exports.delete = catchAsyncError(async (req,res,next) => {
    const post = await postModel.findById(req.params.id)
    if(!post) { next(createHttpError.NotFound())}
    else {
    if(post.userId === req.body.userId) {
        await post.deleteOne()
        res.status(200).json('The post has been deleted')
    }
    else{
        res.status(403).json('You can delete only your post')
    }
}
})

exports.likeDislike = catchAsyncError(async (req,res,next) => {   
    const post = await postModel.findById(req.params.id)
    if(!post.likes.includes(req.body.userId)) {
        await postModel.updateOne({$push : { likes: req.body.userId}})
        res.status(200).json('Post has been liked ')
    }
    else {
        await postModel.updateOne({$pull : {likes: req.body.userId}})
        res.status(200).json('Post has been disliked ')
    }
})

exports.getPost = catchAsyncError(async (req,res,next) => {  
    const post = await postModel.findById(req.params.id)
    res.status(200).json(post)
})

exports.timelineAll = catchAsyncError(async (req,res,next) => { 
    const currentUser = await userModel.findById(req.body.userId)
    const userPosts = await postModel.find({userId : currentUser._id})
    const friendPosts = await Promise.all(
        currentUser.following.map(friendId => {
           return postModel.find({userId : friendId})
        })
    )
    res.json(userPosts.concat(...friendPosts))
})
