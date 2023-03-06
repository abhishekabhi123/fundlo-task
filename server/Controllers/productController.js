const Product = require("../Models/productModel");

module.exports.createProduct = async (req, res) => {
  const { name, description, image } = req.body;
  try {
    const product = await Product.create({ name, description, image });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.json({ status: false });
  }
};

module.exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    throw error;
  }
};
