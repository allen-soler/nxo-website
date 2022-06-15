const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 0,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        validate(val) {
            if (validator.isEmail(val) === false) {
                throw new error('Wrong email')
            }
        },
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate(val) {
            if (validator.isStrongPassword(val) === false) {
                throw new error('Wrong email')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

adminSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.__v

    return userObject
}

//generateAuth for admin user
adminSchema.methods.generateAuth = async function () {
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET)

    user.token = user.tokens.concat({token})
    await user.save()
    
    return token
}

//hashing password
adminSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin