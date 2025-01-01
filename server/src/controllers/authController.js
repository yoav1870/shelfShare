const User = require("../models/userModel");
const { generateToken } = require("../utils/jwt");

const authController = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already registered" });
      }

      const user = new User({ name, email, password });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error registering user", error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = generateToken(user._id);
      res.json({ token });
    } catch (err) {
      res.status(400).json({ message: "Error logging in", error: err.message });
    }
  },
};

module.exports = { authController };
