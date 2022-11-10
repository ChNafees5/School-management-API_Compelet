const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        books: {
            type: String
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('course', courseSchema)