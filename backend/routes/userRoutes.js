const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Add this line to import jsonwebtoken
const jwtSecret = 'your_jwt_secret_key';
const { upload,  loginUser, getUsers, updateUser, deleteUser, authenticate, getProfile } = require('../controllers/userController');
const User = require('../models/user');



const bcrypt = require('bcrypt');
const multer = require('multer');
const crypto = require('crypto');
const gfs = require('../config/gfs');


const storage = multer.memoryStorage(); // Use memory storage
//const upload = multer({ storage });

router.post('/register', upload.single('signature'), async (req, res) => {
  try {
    const { positionName, serviceName, departmentName, firstName, lastName, phone, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let signatureFileId = null;
    if (req.file) {
      const fileId = new mongoose.Types.ObjectId(); // Generate a new ObjectId

      const writeStream = gfs.createWriteStream({
        filename: req.file.originalname,
        mode: 'w',
        content_type: req.file.mimetype,
        metadata: { fieldname: req.file.fieldname },
        id: fileId
      });

      writeStream.on('error', (err) => {
        console.error('GridFS write error:', err);
        res.status(500).json({ msg: 'Error uploading file' });
      });

      writeStream.on('close', (file) => {
        signatureFileId = file._id; // Get the file ID
      });

      writeStream.write(req.file.buffer);
      writeStream.end();
    }

    const newUser = new User({
      firstName,
      lastName,
      positionName,
      serviceName,
      departmentName,
      phone,
      email,
      role: 'HOD',
      signature: signatureFileId,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully', newUser });

  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});




//router.post('/register', upload.single('signature'), registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Profile route
router.get('/profile', authenticate, getProfile);

// Get users with role 'logistic' with 
router.get('/logistic-users', async (req, res) => {
    try {
      const logisticUsers = await User.find({ role: 'LOGISTIC' }).select('firstName lastName signature');
      res.json(logisticUsers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching logistic users', error });
    }
  });
  // Get users with role 'daf'
router.get('/daf-users', async (req, res) => {
  try {
    const dafUsers = await User.find({ role: 'DAF' }).select('firstName lastName signature');
    res.json(dafUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logistic users', error });
  }
});
  // Get users with role 'daf'
  router.get('/DG-users', async (req, res) => {
    try {
      const dgUsers = await User.find({ role: 'DG' }).select('firstName lastName signature');
      res.json(dgUsers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching logistic users', error });
    }
  });
  
  

module.exports = router;
