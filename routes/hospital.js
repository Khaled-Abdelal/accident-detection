const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Hospital = require("../models/Hospital");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// loginRoute

router.post("/login", (req, res) => {
  const { hospitalName, password } = req.body;
  Hospital.findOne({ hospitalName: hospitalName })
    .exec()
    .then(hospital => {
      if (!hospital) {
        return res
          .status(401)
          .json({ error: "hospital name or password is incorrect" });
      } else {
        bcrypt.compare(password, hospital.password).then(auth => {
          if (auth === false) {
            return res.status(401).json({
              error: "hospital name or password is incorrect"
            });
          }
          const token = jwt.sign(
            {
              name: hospital.hospitalName,
              location: hospital.location,
              id: hospital.id,
              loginMode: "hospital"
            },
            keys.JWT_KEY
          );

          return res.status(200).json({
            message: "success",
            token: token
          });
        });
      }
    });
});

router.post("/", (req, res) => {
  const { hospitalName, password, location } = req.body;

  Hospital.findOne({ hospitalName: hospitalName })
    .exec()
    .then(hospital => {
      if (hospital) {
        return res.json({ message: "hospital already registered" });
      } else {
        bcrypt.hash(password, 8, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
          const newHospital = new Hospital({
            hospitalName,
            password: hash,
            location: location
          });
          newHospital.save(function(err) {
            if (err) {
              console.log(err);
              return res.json({ error: "couldn't register" });
            } else {
              const token = jwt.sign(
                {
                  name: newHospital.hospitalName,
                  location: newHospital.location,
                  id: newHospital._id,
                  loginMode: "hospital"
                },
                keys.JWT_KEY
              );
              return res.status(200).json({ message: "success", token: token });
            }
          });
        });
      }
    });
});

module.exports = router;
