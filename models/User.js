const mongoose = require("mongoose");
const { Schema } = mongoose;

// schema for a relative to the user to contact in case of emergency
const Relative = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  _id: false
});

// schema for my user
const UserSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture: { type: String, required: true },
  device_id: { type: String, unique: true, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  bloodType: { type: String, required: true },
  isDonor: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  nextOfKin: { type: Relative, required: true }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
