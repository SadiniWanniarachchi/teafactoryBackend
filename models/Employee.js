const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  empid: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  contact: { type: String, required: true }
});

module.exports = mongoose.model("Employee", employeeSchema);
