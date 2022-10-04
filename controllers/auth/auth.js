const userModel = require('../../db/models/user');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const sendToken = require('../../utils/jwtToken');

// Register
exports.register = catchAsyncError(async (req,res,next) => {

        const {username,email,password} = req.body;
        const user = await userModel.create({
            username,
            email,
            password
        })
        sendToken(user,201,res);

})