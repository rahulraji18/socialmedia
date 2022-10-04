const userModel = require('../../db/models/user');
const catchAsyncError = require('../../middlewares/catchAsyncError');
const sendToken = require('../../utils/jwtToken');
const ErrorHandler = require('../../utils/ErrorHandling')
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

exports.login = catchAsyncError(async (req,res,next) => {

    const {email,password} = req.body;

    //checking email and password
    if(!email || !password) {
        return next(new ErrorHandler('Please Enter Email & Password',400));
    }

    const user = await userModel.findOne({email})//.select('+password');

    if(!user) {
        return next(new ErrorHandler("Invalid Email Or Password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email Or Password",401));
    }
    sendToken(user,200,res);
})

exports.logout = catchAsyncError(async(req,res,next) => {

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "LOGGED OUT"
    })
});