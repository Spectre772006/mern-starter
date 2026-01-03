const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// SECRET (later move to .env)
const JWT_SECRET = "my_super_secret_key";

// test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  // dummy auth (for learning)
  if (email === "test@test.com" && password === "123456") {
    const token = jwt.sign(
      { email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      success: true,
      token,
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// protected route (TEST)
app.get("/api/protected", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Protected data", user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
