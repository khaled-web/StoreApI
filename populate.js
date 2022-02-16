require('dotenv').config();

//importing the link with mongooseDB
const connectDB = require('./db/connect');
//importing DB_factors with it's basic validation
const Product_model = require('./models/product');

//importing the product that we need to store on mongooseDB
const jsonProducts = require('./products.json')


const start = async () => {
 try {
  await connectDB(process.env.MONGO_URI);
  await Product_model.deleteMany(); // to make sure you start from scratch with no data
  await Product_model.create(jsonProducts)
  console.log('success progress')
  process.exit(0);
 } catch (error) {
  console.log(error)
  process.exit(1);

 }
}

start();