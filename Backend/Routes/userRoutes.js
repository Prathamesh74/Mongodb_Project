import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

// Add user
router.post("/add", async (req, res) => {
  try {
    const { name, address, number, gender } = req.body;
    if (!name || !address || !number || !gender)
      return res.status(400).json({ message: "All fields required" });

    const newUser = new User({ name, address, number, gender });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get user by ID
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// Update user
router.put("/:id", async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// Delete user
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

export default router;
