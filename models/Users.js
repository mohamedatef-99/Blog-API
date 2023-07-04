const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: "Blog",
        required: true
    }]
})

userSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

userSchema.set('JSON', {
    virtuals: true
})

module.exports = mongoose.model('User', userSchema)