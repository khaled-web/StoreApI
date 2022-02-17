//importing schema_models
const Product = require('../models/product')

//function for testing-Data
const getAllProductsStatic = async (req, res) => {
 const products = await Product.find().sort('-name price')
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
  company,
  name,
  sort
 } = req.query
 const queryObject = {}

 if (featured) {
  queryObject.featured = featured === 'true' ? true : false;
 }

 if (company) {
  queryObject.company = company;
 }

 if (name) {
  queryObject.name = {
   $regex: name,
   $options: 'i'
  };
 }

 let result = Product.find(queryObject);
 if (sort) {
  const sortList = sort.split(',').join(' ');
  result = result.sort(sortList)
 } else {
  result = result.sort('createdAt')
 }

 const products = await result
 res.status(200).json({
  products,
  nbHits: products.length
 })
}

module.exports = {
 getAllProductsStatic,
 getAllProducts
}