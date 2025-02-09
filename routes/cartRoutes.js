const express = require("express");
const CartItem = require("../models/CartItem");

const router = express.Router();

// Fetch all cart items
router.get("/cart", async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Add or update item in cart
router.post("/cart", async (req, res) => {
    try {
        const { productId, name, image, price } = req.body;

        let item = await CartItem.findOne({ productId });

        if (item) {
            item.quantity += 1;
        } else {
            item = new CartItem({
                productId,
                name,
                image,
                price: parseFloat(price.replace("$", "")),
                quantity: 1
            });
        }

        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Update the quantity of a cart item
router.put("/cart/:id", async (req, res) => {
    const { quantity } = req.body;
    try {
        const updatedItem = await CartItem.findByIdAndUpdate(
            req.params.id,
            { quantity },
            { new: true }
        );
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remove an item from the cart
router.delete("/cart/:id", async (req, res) => {
    try {
        await CartItem.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: "Item deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
