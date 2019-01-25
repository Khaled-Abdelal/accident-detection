const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(req.headers);
    const decoded = jwt.verify(token, keys.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "auth fail" });
  }
};
