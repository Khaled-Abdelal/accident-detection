/// are you in production or development

if (process.env.NODE_ENV === "production") {
  // we are in production
  module.exports = require("./prod.js");
} else {
  // we are in development return dev keys
  module.exports = require("./dev");
}
