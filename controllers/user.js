const User = require('../models/User');
const cryptojs = require('crypto-js');

const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = cryptojs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
  }

  try {
    const updatedUser = await User.findOneAndUpdate(req.params.id, {
      $set: req.body
    }, {new: true});
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
}

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json('User has been deleted');
  } catch (error) {
    return res.status(500).json(error);
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {password, ...others} = user._doc
    return res.status(200).json(others);
  } catch (error) {
    return res.status(500).json(error);
  }
}

const getAllUsers = async (req, res) => {
  const query = req.query;
  try {
    const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { updateUser, deleteUser, getUser, getAllUsers };