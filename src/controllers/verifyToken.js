require("dotenv").config();
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["access-token"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  }

  const decoded = jwt.verify(token, process.env.SECRET);
  req.userID = decoded.id;
  next();
}

module.exports = verifyToken;
