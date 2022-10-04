const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Enter Your Username"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        maxLength: [8, "Password should be greater than 8 characters"],
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    followers: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
        maxLength: 50,
    },
    city: {
        type: String,
        maxLength: 50,
    },
    from: {
        type: String,
        maxLength: 50,
    },
    relationShip: {
        type: Number,
        enum: [1,2,3]
    }
},{timestamps: true});


// HASH PASSWORD
userSchema.pre('save', async function(next) {

    if(!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

//JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({id: this._id},process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

// COMPARE PASSWORD
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password)
};
module.exports = mongoose.model('users',userSchema);