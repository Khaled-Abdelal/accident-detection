const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");
const User = require("./../models/User");

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
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "internal server error" });
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
  hospitals.forEach(hospital => {
    console.log(hospital._id);
    req.io.sockets
      .in(hospital._id)
      .emit("accident", { location: location, user: user });
  });

  res.end();
});

module.exports = router;
