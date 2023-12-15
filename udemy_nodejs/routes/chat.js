const ChatModel =require('../model/chatModel.js');
const express = require('express');
const router = express.Router();


router.get('/chats', async (req, res) => {
  try {
    const chatsData = await ChatModel.find();

    console.log([chatsData][0][0]);

    res.json(chatsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new chat
router.post('/chats', async (req, res) => {
    try {
        req.headers['content-type'] = "application/json; charset=UTF-8";
        console.log(req.body);
        
        const newChat = new ChatModel({
          name: req.body.name,
          avatar: req.body.avatar,
          msg: req.body.msg,
          date: req.body.date,
          count: req.body.count,
          story: req.body.story,
          stories: req.body.stories,
          opened: req.body.opened,
          type: req.body.type,
        });

          console.log(newChat);

          console.log("content-type",req.headers['content-type']);

          const savedChat = await newChat.save();

          res.status(201).json({
            message: 'chatModel created successfully',
            data: savedChat,
          });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/chats', async (req, res) => {
    try {
      const chatsData = await ChatModel.find();

      console.log(chatsData);
  
      res.json(chatsData[0][0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


// Get a specific chat by ID
router.get('/chats/:id', async (req, res) => {
    try {
      const chat = await ChatModel.findById(req.params.id);
      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
      res.json(chat);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Update a chat by ID
  router.put('/chats/:id', async (req, res) => {
    try {
      const updatedChat = await ChatModel.findByIdAndUpdate(
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
  router.delete('/api/chats/:id', async (req, res) => {
    try {
      const deletedChat = await ChatModel.findByIdAndDelete(req.params.id);
      if (!deletedChat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
      res.json(deletedChat);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;