const express = require('express');
const router = express.Router();
const { getOrders, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController');

// GET /api/orders – retrieve all orders
router.get('/', getOrders);

// POST /api/orders – create a new order
router.post('/', createOrder);

// PUT /api/orders/:id – update an existing order
router.put('/:id', updateOrder);

// DELETE /api/orders/:id – delete an order
router.delete('/:id', deleteOrder);

module.exports = router;
