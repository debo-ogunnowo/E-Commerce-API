require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');
const stripeRoutes = require('./routes/stripe');
const cors = require('cors');

const connectDb = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDb connected');
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
}

connectDb();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/checkout', stripeRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
