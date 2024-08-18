const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
        maxlength: 300
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Changed this to reference a user
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            comment: { 
                type: String,
                maxlength: 300
            },   
            score: {
                type: Number,
                default: 0,
                min: 0,
                max: 5
            },
            created: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

// Adding a virtual for average score
postSchema.virtual('averageScore').get(function() {
    if (this.comments.length === 0) return 0;
    const total = this.comments.reduce((sum, comment) => sum + comment.score, 0);
    return total / this.comments.length;
});

module.exports = mongoose.model('Post', postSchema);
