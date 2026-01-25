const jwt = require("jsonwebtoken");
const SECRET = "SECRET_KEY";

function auth(role) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    try {
      const decoded = jwt.verify(token, SECRET);
      if (role && decoded.role !== role) {
        return res.status(403).json({ message: "Permission denied" });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
}

module.exports = auth;
