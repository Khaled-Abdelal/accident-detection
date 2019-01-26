const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture: { type: String, required: true },
  device_id: { type: String, unique: true, required: true },
  type: { type: String, default: "user" }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
