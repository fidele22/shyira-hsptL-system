const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

const mongoURI = 'mongodb+srv://fidelehirwa23:K9Z0AKzw5EHhJ6nH@cluster0.pcjespr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

conn.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

module.exports = gfs;
