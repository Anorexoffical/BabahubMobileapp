const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const app = express();

// app.use(cors());
app.use(cors({
  origin: ["https://account.babahub.co/","http://localhost:3001", "http://localhost:5173"], // Allow only your production domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // <-- needed for PayFast notifyurl


const productRoutes = require('./Routes/ProductRoute');
const notifyRoutes = require('./Routes/Payment/notifyurl.js');
const orderRoutes = require('./Routes/OrderRoute.js');
const UserRoutes = require("./Routes/UserRoute.js");




// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/products', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/payment', notifyRoutes);
app.use("/api/users", UserRoutes);



mongoose.connect("mongodb://127.0.0.1:27017/Babhub") 
  .then(() => console.log('Connected to the database.'))
  .catch((err) => console.error('Failed to connect to the database.', err));

  app.listen(3001, () => {
  console.log("Server is running on port 3001");
});