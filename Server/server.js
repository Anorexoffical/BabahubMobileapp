const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ CORS configuration
const allowedOrigins = [
  "https://account.babahub.co",   // production frontend
  "http://localhost:5173",        // Vite / React dev
  "http://localhost:19006",       // Expo web dev
  "http://127.0.0.1:19006"        // sometimes Expo uses this
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Handle OPTIONS preflight requests
app.options("*", cors());

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
