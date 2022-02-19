//importing schema_models
const Product = require('../models/product')

//function for testing-Data
const getAllProductsStatic = async (req, res) => {
 const products = await Product.find({
  price: {
   $gt: 30, // ${gt}...it's means biggest than
  }
 }).sort('price').select('name price')
 // throw new Error('testing async errors')
 res.status(200).json({
  nbHits: products.length, // to present the No. of data
  products
 })
}

//function for reading-Data
const getAllProducts = async (req, res) => {
 const {
  featured,
  company,
  name,
  sort,
  fields,
  numericFilters
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

 //numericFilters
 if (numericFilters) {
  const operatorMap = {
   '>': '$gt',
   '>=': '$gte',
   '=': '$eq',
   '<': '$lt',
   '<=': '$lte',
  }
  const regEx = /\b(<|>|>=|=|<|<=)\b/g
  let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
  const options = ['price', 'rating'];
  filters = filters.split(',').forEach((item) => {
   const [field, operator, value] = item.split('-')
   if (options.includes(field)) {
    queryObject[field] = {
     [operator]: Number(value)
    }
   }
  })
 }
 console.log(queryObject)
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

 const page = Number(req.query.page) || 1;
 const limit = Number(req.query.limit) || 10;
 const skip = (page - 1) * limit;

 result = result.skip(skip).limit(limit)
 const products = await result

 res.status(200).json({
  nbHits: products.length,
  products,
 })
}

module.exports = {
 getAllProductsStatic,
 getAllProducts
}