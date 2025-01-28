const express = require('express');
const router = express.Router();
const QualityCheck = require('../models/QualityCheck');

// Create a new quality check
router.post('/', async (req, res) => {
  try {
    const newCheck = new QualityCheck(req.body);
    await newCheck.save();
    res.status(201).json(newCheck);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all quality checks
router.get('/', async (req, res) => {
  try {
    const checks = await QualityCheck.find();
    res.status(200).json(checks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single quality check by ID
router.get('/:id', async (req, res) => {
  try {
    const check = await QualityCheck.findById(req.params.id);
    if (!check) return res.status(404).json({ message: 'Not Found' });
    res.status(200).json(check);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a quality check by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCheck = await QualityCheck.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCheck) return res.status(404).json({ message: 'Not Found' });
    res.status(200).json(updatedCheck);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a quality check by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCheck = await QualityCheck.findByIdAndDelete(req.params.id);
    if (!deletedCheck) return res.status(404).json({ message: 'Not Found' });
    res.status(200).json({ message: 'Deleted Successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
