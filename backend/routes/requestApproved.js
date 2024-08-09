const express = require('express');
const router = express.Router();
const ApprovedRequest = require('../models/approvedRequest');

  
  // Get all approved requests
  router.get('/', async (req, res) => {
    try {
      const approvedRequests = await ApprovedRequest.find();
      res.json(approvedRequests);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching approved requests', error });
    }
  });
  

  module.exports = router;