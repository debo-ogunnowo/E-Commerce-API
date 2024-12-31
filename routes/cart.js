const router = require('express').Router();
const { createCart, updateCart, deleteCart, getAllCarts, getCart } = require('../controllers/cart');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

router.post('/', verifyToken, createCart);
router.put('/:id', verifyTokenAndAdmin, updateCart);
router.delete('/:id', verifyTokenAndAdmin, deleteCart);
router.get('/find/:id', verifyTokenAndAuthorization, getCart);
router.get('/:id', verifyTokenAndAdmin, getAllCarts);

module.exports = router;