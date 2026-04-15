const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection (direct URI)
mongoose
  .connect(
    "mongodb+srv://dbUser:yogeesh@stk.9p7shmx.mongodb.net/db1?retryWrites=true&w=majority&appName=stk"
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Schema & Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 API WORKING");
});

// Register route
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({
      message: "User Registered Successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Start server (PORT = 4000)
app.listen(4000, () => {
  console.log("✅ Server running on port 4000");
});
