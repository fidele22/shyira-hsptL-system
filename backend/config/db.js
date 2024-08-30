const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://fidelehirwa23:K9Z0AKzw5EHhJ6nH@cluster0.pcjespr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected');

    // Initialize GridFS
    const conn = mongoose.connection;
    const gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads'); // Collection to store files

    module.exports.gfs = gfs;

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports.connectDB = connectDB;
