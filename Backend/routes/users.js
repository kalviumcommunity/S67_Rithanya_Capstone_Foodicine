
const express = require('express');
const User = require('../models/User');
const router = express.Router();
  
router.get('/ping', (req, res) => res.send('pong'));


router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
