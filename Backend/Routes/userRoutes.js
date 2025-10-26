// backend/routes/userRoutes.js
import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", err });
  }
});

// POST add new user
router.post("/add", async (req, res) => {
  try {
    const { name, address, number, gender } = req.body;
    const newUser = new User({ name, address, number, gender });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ message: "Failed to add user", err });
  }
});

// DELETE user by ID
router.delete("/:id", async (req, res) => {
  try {
    console.log("Deleting user:", req.params.id);
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", err });
  }
});

export default router;
