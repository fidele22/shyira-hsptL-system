const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { MongoClient } = require('mongodb');

// Ensure to use a valid connection string
const mongoURI = 'mongodb+srv://fidelehirwa23:K9Z0AKzw5EHhJ6nH@cluster0.pcjespr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const conn = mongoose.createConnection(mongoURI,);

let gfs;

conn.once('open', () => {
  // Initialize GridFS
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // The collection name for storing files
});

// Handle connection errors
conn.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

module.exports = gfs;
