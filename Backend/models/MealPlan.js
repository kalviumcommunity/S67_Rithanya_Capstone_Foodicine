const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meals: [{
    name: String,
    type: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Post-Workout'] },
    ingredients: [String],
    calories: Number,
    macros: {
      protein: Number,
      carbs: Number,
      fats: Number,
    }
  }],
  date: { type: Date, required: true }
});

const meal = mongoose.model('MealPlan', mealPlanSchema);
module.exports = meal

