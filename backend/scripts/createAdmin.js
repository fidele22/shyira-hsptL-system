const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Position = require('../models/position'); // Import Position model
const Service = require('../models/service');
const Department = require('../models/department');

const createAdmin = async () => {
  await mongoose.connect('mongodb://localhost:27017/shyiradb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin', salt);

  // Fetch the desired position data
  let position;
  try {
    position = await Position.findOne({ name: 'position111' }); // Adjust query as per your Position model
    if (!position) {
      throw new Error('Admin Position not found');
    }
  } catch (err) {
    console.error('Error fetching position:', err);
    mongoose.connection.close();
    return;
  }

  const admin = new User({
    firstName: 'Admin',
    lastName: 'User',
    phone: '123456789',
    email: 'admin@.com',
    signature: 'AdminSignature',
    password: hashedPassword,
    role: 'admin',
    positionName: position.name, // Assign positionName from fetched position
    // serviceName and departmentName can be similarly fetched and assigned
    serviceName: 'admin', // Example, replace with actual fetched data
    departmentName: 'admin', // Example, replace with actual fetched data
  });

  try {
    await admin.save();
    console.log('Admin user created successfully');
  } catch (err) {
    console.error('Error creating admin user:', err);
  }

  mongoose.connection.close();
};

createAdmin();
