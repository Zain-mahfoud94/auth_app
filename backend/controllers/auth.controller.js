import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = await User.insertOne({
      email,
      password: hashedPassword,
      name,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 Hours
    });
    // Save the user
    await user.save();
    // JWT
    generateTokenAndSetCookie(res, user._id);
    // Send the reponse
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("Failed to signup with error: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later",
    });
  }
};

export const login = async (req, res) => {
  res.send("login route");
};

export const logout = async (req, res) => {
  res.send("logout route");
};
