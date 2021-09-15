import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// Auth user & get token
// POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    // Unauth
    res.status(401);
    throw new Error("Invalid email or password.");
  }
});

// Get user profile
// Get /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  res.send("success");
});
