//importing schema_models
const product = require('../models/product')

//function for testing-Data
const getAllProductsStatic = async (req, res) => {
 const products = await product.find(req.query)
 // throw new Error('testing async errors')
 res.status(200).json({
  products,
  nbHits: products.length // to present the No. of data
 })
}

//function for reading-Data
const getAllProducts = async (req, res) => {
 const {
  featured,
  company
 } = req.query
 const queryObject = {}

 if (featured) {
  queryObject.featured = featured === 'true' ? true : false;
 }

 if (company) {
  queryObject.company = company;
 }

 console.log(queryObject)

 const products = await product.find(queryObject);
 res.status(200).json({
  products,
  nbHits: products.length
 })
}

module.exports = {
 getAllProductsStatic,
 getAllProducts
}