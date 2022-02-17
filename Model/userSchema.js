const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
    type: String,
    required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    }
});

const users = mongoose.model("users", userSchema);
module.exports = users