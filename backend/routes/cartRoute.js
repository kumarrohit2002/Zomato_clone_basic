const express = require('express');
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

const cartRouter = express.Router();

// Route to add an item to the cart
cartRouter.post('/add', authMiddleware, addToCart);

// // Route to remove an item from the cart
cartRouter.post('/remove', authMiddleware, removeFromCart);

// Route to get the current cart
cartRouter.post('/get', authMiddleware, getCart);

module.exports = cartRouter;
