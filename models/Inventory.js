const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, required: true },
  threshold: { type: Number, required: true },
});

const Inventory = mongoose.model("Inventory", InventorySchema);
module.exports = Inventory;
