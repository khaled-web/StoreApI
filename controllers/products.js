//importing schema_models
const product = require('../models/product')

//function for testing-Data
const getAllProductsStatic = async (req, res) => {
 const products = await product.find({ //basic find_data
  name: 'accent chair'
 })
 // throw new Error('testing async errors')
 res.status(200).json({
  products,
  nbHits: products.length // to present the No. of data
 })
}

//function for writing-Data
const getAllProducts = async (req, res) => {
 const products = await product.find(req.query);
 res.status(200).json({
  products,
  nbHits: products.length
 })
}

module.exports = {
 getAllProductsStatic,
 getAllProducts
}