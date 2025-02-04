const express = require("express");
const router = express.Router();
const SystemUser = require("../models/SystemUser");

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await SystemUser.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new user
router.post("/", async (req, res) => {
    const { name, email, role, status } = req.body;
    const user = new SystemUser({ name, email, role, status });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a user
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, role, status } = req.body;

    try {
        const updatedUser = await SystemUser.findByIdAndUpdate(
            id,
            { name, email, role, status },
            { new: true }
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a user
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await SystemUser.findByIdAndDelete(id); // Corrected from User to SystemUser
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;