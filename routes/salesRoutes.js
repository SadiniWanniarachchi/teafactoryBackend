const express = require("express");
const Sale = require("../models/Sale");

const router = express.Router();

// Get all sales
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sales data" });
  }
});

// Get a Single Sales Detail by ID
router.get("/:id", async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sales record not found" });
    res.json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Add a new sale
router.post("/", async (req, res) => {
  try {
    const { product, quantity, amount, date } = req.body;
    const newSale = new Sale({ product, quantity, amount, date });
    await newSale.save();
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ error: "Error adding sale" });
  }
});

// Update a sale
router.put("/:id", async (req, res) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedSale);
  } catch (error) {
    res.status(500).json({ error: "Error updating sale" });
  }
});

// Delete a sale
router.delete("/:id", async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting sale" });
  }
});

module.exports = router;
