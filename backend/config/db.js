const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://fidelehirwa23:K9Z0AKzw5EHhJ6nH@cluster0.pcjespr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { 
      // You can add options here if needed
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
