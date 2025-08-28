const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../Models/UserModel");

const router = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Register new user
 */
router.post("/register", async (req, res) => {
  const { name, email, dob, password } = req.body;
  console.log("Incoming body:", req.body);

  try {
    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const newUser = new User({ name, email, dob, password });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        dob: newUser.dob,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * @route   POST /api/users/login
 * @desc    Login user
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        dob: user.dob,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
