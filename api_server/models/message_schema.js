const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    msg: String
});

module.exports = mongoose.model('message', messageSchema);