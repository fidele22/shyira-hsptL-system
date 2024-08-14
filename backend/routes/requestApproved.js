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
  // get approved one by one according to it ID
  router.get('/:id', async (req, res) => {
    try {
      const requestId = req.params.id;
      const request = await ApprovedRequest.findById(requestId); // Assuming Mongoose model
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }
      res.json(request);
    } catch (error) {
      console.error('Error fetching request:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router;