const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");

// Get all inventory items
router.get("/", async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
});

// Get a Single Inventory Item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Inventory item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new inventory item
router.post("/", async (req, res) => {
  try {
    const { name, stock, threshold } = req.body;
    const newItem = new Inventory({ name, stock, threshold });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an inventory item
router.put("/:id", async (req, res) => {
  try {
    const { name, stock, threshold } = req.body;
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      { name, stock, threshold },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an inventory item
router.delete("/:id", async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
