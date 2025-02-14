const express = require("express");
const router = express.Router();
const CartItem = require("../models/CartItem");

// Add item to cart
router.post("/", async (req, res) => {
    const { name, image, price } = req.body;

    try {
        const newCartItem = new CartItem({
            name,
            image,
            price,
            quantity: 1, // Default quantity
        });

        const savedCartItem = await newCartItem.save();
        res.status(201).json(savedCartItem);
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(400).json({ message: error.message });
    }
});

// Get all cart items
router.get("/", async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;