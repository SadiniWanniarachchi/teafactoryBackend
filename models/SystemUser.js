const mongoose = require("mongoose");

const systemuserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
});

module.exports = mongoose.model("SystemUser", systemuserSchema);