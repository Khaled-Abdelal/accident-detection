const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, keys.JWT_USER_KEY);
    if (decoded.isAdmin === true) {
      next();
    } else {
      return res.status(401).json({ error: "auth fail" });
    }
  } catch (error) {
    return res.status(401).json({ error: "auth fail" });
  }
};
