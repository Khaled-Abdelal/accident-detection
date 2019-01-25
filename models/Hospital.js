const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HospitalSchema = new Schema({
  hospitalName: String,
  password: String,
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
      required: true
    }
  }
});

const Hospital = mongoose.model("Hospital", HospitalSchema);
module.exports = Hospital;
