// controllers/userController.js
const User = require('../models/user');
const Position = require('../models/position');
const Service = require('../models/service');
const Department = require('../models/department');

const registerUser = async (req, res) => {
  try {
    const { position, service, department, firstName, lastName, phone,password, signature } = req.body;

    // Find or create the related department
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

    // Create a new user with references to the position and department
    const newUser = new User({
      firstName,
      lastName,
      phone,
      signature,
      password,
      positionId: positionObj._id,
      departmentId: departmentObj._id
    });

    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

module.exports = {
  registerUser,
};
