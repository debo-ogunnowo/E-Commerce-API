const router = require('express').Router();
const { updateUser, deleteUser, getUser, getAllUsers } = require('../controllers/user');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

router.put('/:id', verifyTokenAndAuthorization, updateUser);
router.delete('/find/:id', verifyTokenAndAuthorization, deleteUser);
router.get('/:id', verifyTokenAndAdmin, getUser);
router.get('/', verifyTokenAndAdmin, getAllUsers);

module.exports = router;