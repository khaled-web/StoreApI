//dotenv...to secure your database
require('dotenv').config();

//async errors
require('express-async-errors')

const express = require('express');
const app = express();

// connect dataBase with server
const connectDB = require('./db/connect')

// importing the routers
const productsRouter = require('./routes/products')

// default errors
const notFoundMiddleware = require('./middleware/not-found'); // incase of...There are an error
const errorMiddleware = require('./middleware/error-handler.js'); // incase of...There are an error



//middleware...to use req.body..."We will not use this syntax"
app.use(express.json());


//TestingRoute
app.get('/', (req, res) => {
 res.send('<h1>Store Api</h1><a href="/api/v1/products">products route</a>')
})
//middleware..."share the routes with it's functions"
app.use('/api/v1/products', productsRouter)

// Active the error message
app.use(notFoundMiddleware);
app.use(errorMiddleware);


const port = process.env.PORT || 2000;
const start = async () => {
 try {
  //connect DB
  await connectDB(process.env.MONGO_URI)
  app.listen(port, console.log(`server is listening port ${port}...`))
 } catch (error) {
  console.log(error)
 }
}

start()