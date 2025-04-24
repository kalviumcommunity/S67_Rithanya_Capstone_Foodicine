const express = require('express');
const meal = require('../models/mealplan');
const router = express.Router();



router.post('/', async (req, res) => {
  try {
    const mealPlan = new meal(req.body);
    await mealPlan.save();
    res.status(201).json(mealPlan);
  } catch (error) {
   res.status(400).json({ message: error.message }); 
  }
}); 


module.exports = router;


