const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");

router.post("/", async (req, res) => {
  const location = req.body.location;

  console.log("route hit location " + location + " io " + req.io.sockets);
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
    req.io.sockets.in(hospital._id).emit("accident", { location: location });
  });

  res.end();
});

module.exports = router;
