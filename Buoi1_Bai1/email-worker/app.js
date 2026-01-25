const express = require("express");
const auth = require("./auth.middleware");
const { generateToken } = require("./jwt.util");
const { createOrder } = require("./order.controller");

const app = express();
app.use(express.json());

// login demo
app.post("/login", (req, res) => {
  const { username } = req.body;
  const role = username === "admin" ? "admin" : "guest";
  const token = generateToken({ username, role });
  res.json({ accessToken: token });
});

// order API
app.post("/orders", auth(), createOrder);

app.listen(3000, () => {
  console.log("Order Service running on port 3000");
});
