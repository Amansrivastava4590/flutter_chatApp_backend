const CallModel =require('../model/callModel.js');
const express = require('express');
const router = express.Router();

// Create a new chat
router.post('/calls', async (req, res) => {
    try {
        req.headers['content-type'] = "application/json; charset=UTF-8";
        console.log(req.body);
        
        const newCall = new CallModel({
          name: req.body.name,
          avatar: req.body.avatar,
          msg: req.body.msg,
          date: req.body.date,
          count: req.body.count,
          outbound:req.body.outbound,
          type: req.body.type,
        });

          console.log(newCall);

          console.log("content-type",req.headers['content-type']);

          const savedCall = await newCall.save();

          res.status(201).json({
            message: 'CallModel created successfully',
            data: savedCall,
          });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/calls', async (req, res) => {
    try {
      const callsData = await CallModel.find();
  
      res.json({
        message: 'Calls data retrieved successfully',
        data: callsData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


// Get a specific chat by ID
router.get('/calls/:id', async (req, res) => {
    try {
      const chat = await CallModel.findById(req.params.id);
      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
      res.json(chat);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Update a chat by ID
  router.put('/calls/:id', async (req, res) => {
    try {
      const updatedChat = await CallModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedChat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
      res.json(updatedChat);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Delete a chat by ID
  router.delete('/api/calls/:id', async (req, res) => {
    try {
      const deletedChat = await CallModel.findByIdAndDelete(req.params.id);
      if (!deletedChat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
      res.json(deletedChat);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;