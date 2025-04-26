require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mealPlanRoutes = require('./routes/mealPlans');
const userRoutes = require('./routes/users');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/mealplans', mealPlanRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;  
mongoose
  .connect(MONGO_URI)                  
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
