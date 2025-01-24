const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id };
    req.isAdmin = decoded.isAdmin;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};
const adminMiddleware = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: "Access forbidden: Admins only" });
  }
  next();
};
module.exports = { authMiddleware, adminMiddleware };
