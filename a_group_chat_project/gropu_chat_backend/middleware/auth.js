// jsonwebtoken package ko require kar rahe hain JWT verify karne ke liye
const jwt = require('jsonwebtoken');

// User model ko import kar rahe hain database se user fetch karne ke liye
const User = require('../models/usersmodel');

// Authentication middleware function
const aunthenticate = async (req, res, next) => {
  
  try {
console.log("Authenticating user...");
    // Client ke request headers se authorization token le rahe hain
    const token = req.headers.authorization;
console.log("Received token:", token);
    // Agar token nahi mila to unauthorized response bhej do
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Token ko verify kar rahe hain secret key se
    // Agar token galat ya expired hua to yahin error throw hoga
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log("Decoded token:", decoded);
    // Token se userId nikal kar database me user find kar rahe hain
    const user = await User.findByPk(decoded.userId);
console.log("User found in database:", user);
    // Agar database me user nahi mila to unauthorized response bhej do
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Agar sab sahi hai to user object ko request me attach kar do
    // Taaki next middleware ya route handler use kar sake
    req.user = user;
    console.log("Authenticated user:", req.user.id);

    // Next middleware / controller ko call karo
    next();

  } catch (error) {

    // Agar token invalid, expired ya verify fail hua to yahan catch hoga
    console.log(error);

    // Invalid token ka response bhej rahe hain
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware ko export kar rahe hain taaki routes me use kar sake
module.exports = { aunthenticate };