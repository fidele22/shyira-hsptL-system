const User = require('../models/user');
const Position = require('../models/position');
const Service = require('../models/service');
const Department = require('../models/department');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';// Ensure you have a secret key

const registerUser = async (req, res) => {

  try {

    const { position, service, department, firstName, lastName, phone, email, password, signature, role } = req.body;

    // Find or create the related department associate it with the service
    let departmentObj = await Department.findOne({ departmentName: department});
    if (!departmentObj) {
      departmentObj = new Department({ departmentName: department });
      await departmentObj.save();
    }

    // Find or create the related service and associate it with the department
    let serviceObj = await Service.findOne({ service_name: service, departmentId: departmentObj._id });
    if (!serviceObj) {
      serviceObj = new Service({ service_name: service, departmentId: departmentObj._id });
      await serviceObj.save();
    }

    // Find or create the related position and associate it with the service
    let positionObj = await Position.findOne({ positionName: position, serviceId: serviceObj._id });
    if (!positionObj) {
      positionObj = new Position({ positionName: position, serviceId: serviceObj._id });
      await positionObj.save();
    }

// Hash the password
const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with references to the position and department
    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      signature,
      password: hashedPassword, 
      role: 'pending',
      positionId: positionObj._id,
      departmentId: departmentObj._id,
      serviceId: serviceObj._id
    });

    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Middleware to authenticate user
const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};


// Profile route
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('positionId', 'positionName')
      .populate('serviceId', 'service_name')
      .populate('departmentId', 'departmentName');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      signature: user.signature,
      // Check if positionId, serviceId, and departmentId are not null before accessing their properties
      position: user.positionId ? user.positionId.positionName : null,
      service: user.serviceId ? user.serviceId.service_name : null,
      department: user.departmentId ? user.departmentId.departmentName : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//fetching user data and display to admin dashboard
const getUsers = async (req, res) => {
  try {
    // Fetch users excluding those with the role of "admin"
    const users = await User.find({ role: { $ne: 'admin' } })
      .populate('departmentId')
      .populate('serviceId')
      .populate('positionId');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const { position, service, department, firstName, lastName, phone, email, role } = req.body;
    const userId = req.params.id;

    // Find or create the related department and associate it with the service
    let departmentObj = await Department.findOne({ departmentName: department });
    if (!departmentObj) {
      departmentObj = new Department({ departmentName: department });
      await departmentObj.save();
    }

    // Find or create the related service and associate it with the department
    let serviceObj = await Service.findOne({ service_name: service, departmentId: departmentObj._id });
    if (!serviceObj) {
      serviceObj = new Service({ service_name: service, departmentId: departmentObj._id });
      await serviceObj.save();
    }

    // Find or create the related position and associate it with the service
    let positionObj = await Position.findOne({ positionName: position, serviceId: serviceObj._id });
    if (!positionObj) {
      positionObj = new Position({ positionName: position, serviceId: serviceObj._id });
      await positionObj.save();
    }

    // Update the user with references to the position and department
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        phone,
        email,
        role,
        positionId: positionObj._id,
        departmentId: departmentObj._id,
        serviceId: serviceObj._id,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete user
    await User.findByIdAndDelete(userId);

    // Example of cascading deletion (adjust as per your schema and requirements)
    // Remove service if not referenced by any other user
    await Service.deleteMany({ _id: { $nin: await User.distinct('serviceId', { _id: { $ne: userId } }) } });

    // Remove position if not referenced by any other user
    await Position.deleteMany({ _id: { $nin: await User.distinct('positionId', { _id: { $ne: userId } }) } });

    // Remove department if not referenced by any other user
    await Department.deleteMany({ _id: { $nin: await User.distinct('departmentId', { _id: { $ne: userId } }) } });

    res.status(200).json({ message: 'User and associated data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, getUsers,loginUser, updateUser, deleteUser,authenticate,getProfile};