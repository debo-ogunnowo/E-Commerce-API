const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
      const newOrder = new Order(req.body);
    
      await newOrder.save();
    return res.status(201).json(newOrder);
    } catch (error) {
      return res.status(500).json(error);
    }
};

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(req.params.id, {
      $set: req.body
    }, {new: true});
    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json(error);
  }
}

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    return res.status(200).json('Order has been deleted');
  } catch (error) {
    return res.status(500).json(error);
  }
}

const getOrder = async (req, res) => {
  try {
    const orders = await Order.find(req.params.id);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
}

const getAllOrders = async (req, res) => {
  try{
    const orders = await Orders.find();
    return res.status(200).json(orders);
  }
   catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { createOrder, updateOrder, deleteOrder, getAllOrders, getOrder };