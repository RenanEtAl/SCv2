const mongoose = require('mongoose')

const Campaign = mongoose.model('Campaign', {
    blockHash: {
        type: String,
        required: true
    },
    blockNumber: {
        type: Number,
        required: true
    },
    transaction: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    min: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Campaign