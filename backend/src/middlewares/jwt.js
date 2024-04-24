const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/index");

const authToken = (req, res, next) => {
  const token = req.header("x-auth-token");
 
  if (!token)
    return res.status(403).send("A token is required for authentication");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      success: false,
      data: { message: "Invalid token" },
    });
  }
  return next();
};

module.exports = authToken;


const authPage = (permission) => {
    return (req, res, next) => {
      const role = req.user.sub.role;
      if (!role) {
        return res.status(403).json("You need sign in!");
      }
      if (!permission.includes(role)) {
        return res.status(401).json("You don't have permission!");
      }
      next();
    };
  };
  