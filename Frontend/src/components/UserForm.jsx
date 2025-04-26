import { useState } from "react";
import api from '../api/axios';
import './UserForm.css';
import React from "react";

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    activityLevel: "sedentary",
    goals: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users", formData);
      alert("User created!");
    } catch (error) {
      console.error(error);
      alert("Error creating user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create User</h2>

        <div className="mb-4">
          <input
            className="w-full p-2 border rounded"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            className="w-full p-2 border rounded"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            className="w-full p-2 border rounded"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4 mb-4">
          <input
            className="w-1/2 p-2 border rounded"
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />
          <input
            className="w-1/2 p-2 border rounded"
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4 mb-4">
          <input
            className="w-1/2 p-2 border rounded"
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
          />
          <select
            className="w-1/2 p-2 border rounded"
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
            <option value="very active">Very Active</option>
          </select>
        </div>

        <div className="mb-4">
          <input
            className="w-full p-2 border rounded"
            type="text"
            name="goals"
            placeholder="Goals"
            value={formData.goals}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Create User
        </button>
      </form>
    </div>
  );
}

export default UserForm;
