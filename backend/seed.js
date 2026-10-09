const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const img = (id) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080`;

const importData = async () => {
  try {
    // Sirf products delete honge, users safe rahenge
    await Product.deleteMany();

    // Admin sirf tab banao jab pehle se na ho
    const adminExists = await User.findOne({ email: 'admin@shopnest.com' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);

      await User.create({
        name: 'Admin User',
        email: 'admin@shopnest.com',
        password: hashedPassword,
        role: 'admin'
      });
    }

    const products = [
      {
        name: 'Wireless Noise-Cancelling Headphones',
        description: 'Immersive sound experience with advanced active noise cancellation.',
        price: 299.99,
        category: 'Electronics',
        stock: 15,
        imageUrl: img('photo-1505740420928-5e560c06d30e'),
        ratings: 4.8,
        numReviews: 24
      },
      {
        name: 'Minimalist Modern Chair',
        description: 'A stylish and comfortable addition to any contemporary living room.',
        price: 150.00,
        category: 'Furniture',
        stock: 30,
        imageUrl: img('photo-1505843490538-5133c6c7d0e1'),
        ratings: 4.2,
        numReviews: 12
      },
      {
        name: 'Professional DSLR Camera',
        description: 'Capture stunning moments with high-resolution clarity and speed.',
        price: 1199.99,
        category: 'Electronics',
        stock: 8,
        imageUrl: img('photo-1516035069371-29a1b244cc32'),
        ratings: 4.9,
        numReviews: 50
      },
      {
        name: 'Classic White Sneakers',
        description: 'Versatile and comfortable, a staple for any casual outfit.',
        price: 85.00,
        category: 'Clothing',
        stock: 50,
        imageUrl: img('photo-1542291026-7eec264c27ff'),
        ratings: 4.5,
        numReviews: 89
      },
      {
        name: 'Smart Watch Series 5',
        description: 'Track fitness, heart rate and notifications on your wrist.',
        price: 199.99,
        category: 'Electronics',
        stock: 25,
        imageUrl: img('photo-1523275335684-37898b6baf30'),
        ratings: 4.6,
        numReviews: 63
      },
      {
        name: 'Bluetooth Speaker',
        description: 'Portable speaker with deep bass and 12-hour battery life.',
        price: 59.99,
        category: 'Electronics',
        stock: 35,
        imageUrl: img('photo-1608043152269-423dbba4e7e1'),
        ratings: 4.3,
        numReviews: 27
      },
      {
        name: 'Wooden Study Table',
        description: 'Sturdy solid wood desk, perfect for work or study.',
        price: 220.00,
        category: 'Furniture',
        stock: 12,
        imageUrl: img('photo-1518455027359-f3f8164ba6bd'),
        ratings: 4.4,
        numReviews: 19
      },
      {
        name: 'Cozy Fabric Sofa',
        description: 'Three-seater sofa with soft cushions for your living room.',
        price: 650.00,
        category: 'Furniture',
        stock: 5,
        imageUrl: img('photo-1555041469-a586c61ea9bc'),
        ratings: 4.7,
        numReviews: 33
      },
      {
        name: 'Cotton Casual T-Shirt',
        description: 'Soft breathable cotton for everyday wear.',
        price: 19.99,
        category: 'Clothing',
        stock: 100,
        imageUrl: img('photo-1521572163474-6864f9cf17ab'),
        ratings: 4.1,
        numReviews: 45
      },
      {
        name: 'Denim Jacket',
        description: 'Classic blue denim jacket that goes with everything.',
        price: 65.00,
        category: 'Clothing',
        stock: 40,
        imageUrl: img('photo-1551028719-00167b16eac5'),
        ratings: 4.3,
        numReviews: 22
      },
      {
        name: 'Gaming Mechanical Keyboard',
        description: 'RGB backlit mechanical keyboard with tactile switches.',
        price: 89.99,
        category: 'Electronics',
        stock: 28,
        imageUrl: img('photo-1587829741301-dc798b83add3'),
        ratings: 4.6,
        numReviews: 41
      },
      {
        name: 'Running Shoes',
        description: 'Lightweight cushioned shoes built for daily runs.',
        price: 110.00,
        category: 'Clothing',
        stock: 45,
        imageUrl: img('photo-1542291026-7eec264c27ff'),
        ratings: 4.5,
        numReviews: 57
      }
    ];

    await Product.insertMany(products);

    console.log('✅ Products Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();