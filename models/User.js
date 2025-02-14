const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

});

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;