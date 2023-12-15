const express = require('express');
const router = express.Router();
const MeModel = require('../model/meModel');



// Endpoint for getting 'me' data
router.get('/me', async (req, res) => {
  try {
    // Fetch data from the "users" collection using the MeModel
    const meData = await MeModel.find();

    res.json(
       [meData][0][0]
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Endpoint for getting 'chats' data
router.get('/chats', (req, res) => {
  res.json(chatsData);
});

// Endpoint for getting 'calls' data
router.get('calls', (req, res) => {
  res.json(callsData);
});

// Endpoint for getting 'people' data
router.get('people', (req, res) => {
  res.json(peopleData);
});

// Endpoint for getting 'messages' data
router.get('/message', (req, res) => {
  res.json(messagesData);
});

/// post api

router.post('/me', async (req, res) => {
  try {
    const requestData = req.body;
    req.headers['content-type'] = "application/json; charset=UTF-8";
    console.log(req.body);
    
    // Validate and process the data as needed
    const newMeData = new  MeModel({
      firstName: requestData.firstName,
      lastName: requestData.lastName,
      avatar: requestData.avatar,
      city: requestData.city,
      relationship: requestData.relationship,
      gender: requestData.gender,
      job_title: requestData.job_title,
      job_area: requestData.job_area,
      story: requestData.story,
      status: requestData.status,
      stories: requestData.stories || [], // Ensure it's an array
    });
    console.log(newMeData);
      // Save the new data to MongoDB collection
      const savedData = await newMeData.save();


    res.status(201).json({
      message: 'meModel created successfully',
      data: savedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;