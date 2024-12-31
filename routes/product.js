const router = require('express').Router();
const { verifyTokenAndAdmin } = require('./verifyToken');
const { createProduct, updateProduct, deleteProduct, getAllProducts, getProduct } = require('../controllers/product');

router.post('/', verifyTokenAndAdmin, createProduct);
router.put('/', verifyTokenAndAdmin, updateProduct);
router.get('/find/:id', getProduct);
router.get('/', getAllProducts);

module.exports = router