const express = require('express');
const meal = require('../models/MealPlan');
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


module.exports = router;


