//importing schema_models
const Product = require('../models/product')

//function for testing-Data
const getAllProductsStatic = async (req, res) => {
 const products = await Product.find().sort('-price').select('name price').limit(10).skip(0)
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
  sort,
  fields
 } = req.query
 const queryObject = {}
 //featured
 if (featured) {
  queryObject.featured = featured === 'true' ? true : false;
 }
 //company
 if (company) {
  queryObject.company = company;
 }
 //name
 if (name) {
  queryObject.name = {
   $regex: name,
   $options: 'i'
  };
 }
 //sort
 let result = Product.find(queryObject);
 if (sort) {
  const sortList = sort.split(',').join(' '); //sortMethod
  result = result.sort(sortList)
 } else {
  result = result.sort('createdAt')
 }

 //fields_selectSpecificProperties
 if (fields) {
  const fieldsList = fields.split(',').join(' ');
  result = result.select(fieldsList);
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