const express = require('express');
const router = express.Router();

// importing the data from controllers
const {
 getAllProductsStatic,
 getAllProducts
} = require('../controllers/products');


//creating the routes
router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic);

//exporting the routes
module.exports = router;