const messageModel =require('../model/messageModel.js');
const express = require('express');
const router = express.Router();

// Create a new chat
router.post('/message', async (req, res) => {
    try {
        req.headers['content-type'] = "application/json; charset=UTF-8";
        console.log(req.body);
        
        const newPeople = new messageModel({
        
            msg:req.body.msg,
            image:req.body.image,
            sender:req.body.sender,
            type:req.body.type,
            opened:req.body.opened
        });

          console.log(newPeople);

          console.log("content-type",req.headers['content-type']);

          const savedPeople = await newPeople.save();

          res.status(201).json({
            message: 'messageModel created successfully',
            data: savedPeople,
          });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/message', async (req, res) => {
    try {
      const messagesData = await MessageModel.find();
  
      res.json({
        message: 'Messages data retrieved successfully',
        data: messagesData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


// Get a specific chat by ID
router.get('/message/:id', async (req, res) => {
    try {
      const chat = await messageModel.findById(req.params.id);
      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
      res.json(chat);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Update a chat by ID
  router.put('/message/:id', async (req, res) => {
    try {
      const updatedChat = await messageModel.findByIdAndUpdate(
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
  router.delete('/api/message/:id', async (req, res) => {
    try {
      const deletedChat = await messageModel.findByIdAndDelete(req.params.id);
      if (!deletedChat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
      res.json(deletedChat);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;