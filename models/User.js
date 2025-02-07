const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({

    name: String,
    email: {

        type: String,
        unique: true

    },
    password: String,

    role: {
        type: String,
        enum: ["user", "admin"], // Restricts role values to "user" or "admin"
        default: "user" // Default role is "user"
    }


})

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;