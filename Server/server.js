const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const productRoutes = require('./Routes/ProductRoute');
app.use('/api/products', productRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/Babhub") 
// "mongodb://localhost:27017/"
  .then(() => console.log('Connected to the database.'))
  .catch((err) => console.error('Failed to connect to the database.', err));

  app.listen(3001, () => {
  console.log("Server is running on port 3001");
});