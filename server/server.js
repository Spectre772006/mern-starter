const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // dummy auth for now
  if (email && password) {
    return res.json({ success: true });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
