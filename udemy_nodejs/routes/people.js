const PeopleModel =require('../model/peopleModel.js');
const express = require('express');
const router = express.Router();


router.get('/people', async (req, res) => {
  try {
    const peopleData = await PeopleModel.find();
    console.log(peopleData);

    res.json([peopleData][0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Create a new chat
router.post('/people', async (req, res) => {
    try {
        req.headers['content-type'] = "application/json; charset=UTF-8";
        console.log(req.body);
        
        const newPeople = new PeopleModel({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            msg:req.body.msg,
            date:req.body.date,
            count:req.body.count,
            story:req.body.story,
            image:req.body.image,
            avatar:req.body.avatar,
            status:req.body.status,
            stories:req.body.stories,
        });

          console.log(newPeople);

          console.log("content-type",req.headers['content-type']);

          const savedPeople = await newPeople.save();

          res.status(201).json({
            message: 'PeopleModel created successfully',
            data: savedPeople,
          });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  


// Get a specific chat by ID
router.get('/people/:id', async (req, res) => {
    try {
      const chat = await PeopleModel.findById(req.params.id);
      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
      res.json(chat);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Update a chat by ID
  router.put('/people/:id', async (req, res) => {
    try {
      const updatedChat = await PeopleModel.findByIdAndUpdate(
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
  router.delete('/api/people/:id', async (req, res) => {
    try {
      const deletedChat = await PeopleModel.findByIdAndDelete(req.params.id);
      if (!deletedChat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
      res.json(deletedChat);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;