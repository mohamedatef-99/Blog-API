const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
})

blogSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

blogSchema.set('JSON', {
    virtuals: true
})

module.exports = mongoose.model('Blog', blogSchema)