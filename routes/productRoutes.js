// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

// Add a product
router.post('/', async (req, res) => {
  const { name, category, price, description, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      category,
      price,
      description,
      image
    });

      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("Error saving product");
      res.status(400).json({ message: error.message });
    }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  const { name, category, price, description, image } = req.body;

  try {
  const updatedProduct = {
    name,
    category,
    price,
    description,
    image
  };
    const product = await Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product and image deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;