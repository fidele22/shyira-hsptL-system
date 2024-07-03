const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Position = require('../models/position');
const Service = require('../models/service');
const Department = require('../models/department');

const createAdmin = async () => {
  await mongoose.connect('mongodb://localhost:27017/shyiradb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin', salt);

  // Find or create the related department
  let departmentObj = await Department.findOne({ departmentName: 'Admin Department' });
  if (!departmentObj) {
    departmentObj = new Department({ departmentName: 'Admin Department' });
    await departmentObj.save();
  }

  // Find or create the related service and associate it with the department
  let serviceObj = await Service.findOne({ service_name: 'Admin Service', departmentId: departmentObj._id });
  if (!serviceObj) {
    serviceObj = new Service({ service_name: 'Admin Service', departmentId: departmentObj._id });
    await serviceObj.save();
  }

  // Find or create the related position and associate it with the service
  let positionObj = await Position.findOne({ positionName: 'Admin Position', serviceId: serviceObj._id });
  if (!positionObj) {
    positionObj = new Position({ positionName: 'Admin Position', serviceId: serviceObj._id });
    await positionObj.save();
  }

  const admin = new User({
    firstName: 'Admin',
    lastName: 'User',
    phone: '123456789',
    email: 'admin@example.com',
    signature: 'AdminSignature',
    password: hashedPassword,
    role: 'admin',
    positionId: positionObj._id,
    departmentId: departmentObj._id,
    serviceId: serviceObj._id
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
