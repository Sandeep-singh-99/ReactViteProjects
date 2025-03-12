const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: String,
        timestamp: { type: Date, default: Date.now },
        isSystem: { type: Boolean, default: false }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);