// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
}).single('image');

// Add a product
router.post('/', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(400).json({ message: "Error uploading file" });
    }
    
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const { name, category, price, description } = req.body;
    const newProduct = new Product({
      name,
      category,
      price,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : ''
    });

    try {
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("Error saving product:", error);
      res.status(400).json({ message: error.message });
    }
  });
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
router.put('/:id', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).json({ message: "Error uploading file" });
    } else {
      const { name, category, price, description } = req.body;
      const updatedProduct = {
        name,
        category,
        price,
        description,
        image: req.file ? `/uploads/${req.file.filename}` : req.body.image // Use existing image if no new file is uploaded
      };
      try {
        const product = await Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true });
        res.json(product);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  });
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the image file
    if (product.image) {
      const imagePath = path.join(__dirname, '..', 'public', product.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image file:', err);
        }
      });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product and image deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;