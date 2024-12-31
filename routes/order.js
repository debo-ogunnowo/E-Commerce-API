const router = require('express').Router();
const { createOrder, updateOrder, deleteOrder, getAllOrders, getOrder } = require('../controllers/order');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

router.post('/', verifyToken, createOrder);
router.put('/:id', verifyTokenAndAdmin, updateOrder);
router.delete('/:id', verifyTokenAndAdmin, deleteOrder);
router.get('/find/:id', verifyTokenAndAuthorization, getOrder);
router.get('/:id', verifyTokenAndAdmin, getAllOrders);

module.exports = router;