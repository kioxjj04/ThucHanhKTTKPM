const jwt = require("jsonwebtoken");

const SECRET = "SECRET_KEY";

function generateToken(user) {
  return jwt.sign(
    { username: user.username, role: user.role },
    SECRET,
    { expiresIn: "15m" }
  );
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken };
