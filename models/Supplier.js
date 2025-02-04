const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  supplierID: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  status: { type: String, required: true },
  orders: { type: Number }
});

module.exports = mongoose.model("Supplier", supplierSchema);
