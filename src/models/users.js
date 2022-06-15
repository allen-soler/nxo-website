const mongoose = require('mongoose')
const validator = require('validator')
const admin = require('./admin')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 0,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        validate(val) {
            if (validator.isEmail(val) === false) {
                throw new Error('Wrong email')
            }
        },
        required: true
    },
    questions: [{
        question: {
            type: String,
            trim: true,
            required: true
        },
        date: {
            type: String
        }
    }]
}, {
    timestamps: true
})

userSchema.methods.toJSON = function () {
    return "Your question, has been submited"
}

const User = mongoose.model('Users-question', userSchema)

module.exports = User