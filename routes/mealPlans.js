const express = require('express');
const meal= require('../models/MealPlan');
const router = express.Router();
const User = require('../models/user');



router.post('/', async (req, res) => {
  try {
    const { userId, meals, date } = req.body;

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

  
    const newMealPlan = new meal ({ userId, meals, date });
    await newMealPlan.save();

    res.status(201).json(newMealPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:mealPlanId/meals/:mealIndex', async (req, res) => {
  try {
    const { mealPlanId, mealIndex } = req.params;
    const updates = req.body;

    const mealPlan = await meal.findById(mealPlanId);
    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    if (mealIndex < 0 || mealIndex >= mealPlan.meals.length) {
      return res.status(400).json({ message: 'Invalid meal index' });
    }

    
    const mealToUpdate = mealPlan.meals[mealIndex];
    Object.assign(mealToUpdate, updates);

    await mealPlan.save();
    res.json(mealPlan.meals[mealIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const mealPlans = await meal.find({ userId });

    if (!mealPlans || mealPlans.length === 0) {
      return res.status(404).json({ message: 'No meal plans found for this user' });
    }

    res.json(mealPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;


