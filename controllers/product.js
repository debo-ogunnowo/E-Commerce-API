const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
      const newProduct = new Product(req.body);
    
      await newProduct.save();
    return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(500).json(error);
    }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(req.params.id, {
      $set: req.body
    }, {new: true});
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json(error);
  }
}

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json('Product has been deleted');
  } catch (error) {
    return res.status(500).json(error);
  }
}

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
}

const getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({createdAt: -1}).limit(1);
    }
    else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      }); 
    }
    else {
      products = await Product.find();
    }
    
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { createProduct, updateProduct, deleteProduct, getAllProducts, getProduct };