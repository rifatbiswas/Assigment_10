
const Product = require("../model/product");

exports.GetProduct= async (req, res) => {
  try {
    const products = await Product.find({}, {name:1, price:1});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


