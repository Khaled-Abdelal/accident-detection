const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");
const User = require("./../models/User");
const axios = require("axios");
const keys = require("../config/keys");
router.post("/", async (req, res) => {
  const { location, device_id } = req.body;

  console.log("route hit location " + location);
  try {
    var user = await User.findOne({ device_id: device_id })
      .select({ password: 0, type: 0 })
      .exec();
    if (!user) {
      return res.status(404).json({ error: "no user with this device id" });
    }

    const hospitals = await Hospital.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [
              parseFloat(req.body.location[0]),
              parseFloat(req.body.location[1])
            ]
          },
          spherical: true,
          maxDistance: 100000,
          distanceField: "dist.calculated"
        }
      }
    ]);
    console.log(hospitals);
    if (hospitals.length === 0) {
      return res.status(400).json({ message: "no hospital near you" });
    }

    hospitals.forEach(hospital => {
      console.log(hospital._id);
      req.io.sockets
        .in(hospital._id)
        .emit("accident", { location: location, user: user });
    });
    const { data } = await axios.get(
      `https://maps.google.com/maps/api/geocode/json?latlng=${
        req.body.location[1]
      }
    ,${req.body.location[0]}&key=${keys.GOOGLE_API_KEY}&language=ar`
    );
    const response = {
      userName: user.name,
      relativeName: user.nextOfKin.name,
      relativePhoneNumber: user.nextOfKin.phoneNumber,
      accidentLocation: data.results[0].formatted_address
    };
    res.send(response).end();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
