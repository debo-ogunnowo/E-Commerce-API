const Cart = require('../models/Cart');

const createCart = async (req, res) => {
  try {
      const newCart = new Cart(req.body);
    
      await newCart.save();
    return res.status(201).json(newCart);
    } catch (error) {
      return res.status(500).json(error);
    }
};

const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(req.params.id, {
      $set: req.body
    }, {new: true});
    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json(error);
  }
}

const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json('Cart has been deleted');
  } catch (error) {
    return res.status(500).json(error);
  }
}

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne(req.params.id);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json(error);
  }
}

const getAllCarts = async (req, res) => {
  try{
    const carts = await Carts.find();
    return res.status(200).json(carts);
  }
   catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { createCart, updateCart, deleteCart, getAllCarts, getCart };