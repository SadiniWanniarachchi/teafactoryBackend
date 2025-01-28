const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Get All Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a Single Employee by ID
router.get("/:id", async (req, res) => {
  try {
    console.log("Request received for Employee ID:", req.params.id);

    // Validate ObjectId format before querying
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log("Invalid Employee ID format:", req.params.id);
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    // Fetch employee from the database
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      console.log("Employee not found:", req.params.id);
      return res.status(404).json({ message: "Employee not found" });
    }

    console.log("Employee found:", employee);
    res.status(200).json(employee);
  } catch (err) {
    console.error("Error fetching employee:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a New Employee
router.post("/", async (req, res) => {
  try {
    const { name, empid, role, contact } = req.body;
    const newEmployee = new Employee({ name, empid, role, contact });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an Employee
router.put("/:id", async (req, res) => {
  try {
    const { name, empid, role, contact } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, empid, role, contact },
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an Employee
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
