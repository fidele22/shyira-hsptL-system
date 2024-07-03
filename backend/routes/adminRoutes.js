//const express = require('express');
//const router = express.Router();
//const User = require('../models/user');
//const { body, validationResult } = require('express-validator');
//const { adminAuth } = require('../middlewares/auth');
//
//router.get('/pending-users', adminAuth, async (req, res) => {
//    try {
//        const users = await User.find({ role: 'pending' });
//        res.status(200).json(users);
//    } catch (error) {
//        res.status(500).json({ message: 'Error fetching users', error });
//    }
//});
//
//router.post('/assign-role', adminAuth, [
//    body('userId').notEmpty(),
//    body('role').isIn(['logistic', 'accountant', 'DG', 'DAF', 'serviser', 'admin'])
//], async (req, res) => {
//    const errors = validationResult(req);
//    if (!errors.isEmpty()) {
//        return res.status(400).json({ errors: errors.array() });
//    }
//
//    const { userId, role } = req.body;
//
//    try {
//        const user = await User.findById(userId);
//        if (!user) {
//            return res.status(404).json({ message: 'User not found' });
//        }
//
//        user.role = role;
//        await user.save();
//
//        res.status(200).json({ message: 'Role assigned successfully' });
//    } catch (error) {
//        res.status(500).json({ message: 'Error assigning role', error });
//    }
//});
//
//module.exports = router;
//