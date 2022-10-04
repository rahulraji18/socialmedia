const userModel = require('../../db/models/user');
const catchAsyncError = require('../../middlewares/catchAsyncError');

exports.update = catchAsyncError(async (req,res,next) => {
    const {password,...others} = req.body;
    console.log(others)
    if(req.body.userId === req.params.id || req.user.isAdmin) {
        const user = await userModel.findByIdAndUpdate(req.params.id, {
            $set: others,
        })
 
        res.status(200).json({
            success: true,
            message: 'Account has been updated'
        })
        
    }else{
        return res.status(200).json({
            success: true,
            message: 'You can update only your account'
        })
    }
})

exports.delete = catchAsyncError(async (req,res,next) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        const user = await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Account has been deleted')
        }
        else{
            res.status(200).json('Only delete your account')  
        }
})

exports.view = catchAsyncError(async (req,res,next) => {
    const user = await userModel.findById(req.params.id);  
    const {password, udatedAt, ...other} = user._doc;
    res.status(200).json(other);
})