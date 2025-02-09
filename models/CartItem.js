// models/CartItem.js
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true }, // Add unique identifier
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true }, // Change to Number type
    quantity: { type: Number, required: true, default: 1 },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;