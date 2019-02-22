const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const authAdmin = require("../middlewares/authAdmin");

// multer used to upload user picture

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, new Date().toISOString() + file.originalname);
  }
});
const upload = multer({ storage: storage });

// signup route
router.post("/", authAdmin, upload.single("picture"), (req, res) => {
  console.log(req.body);
  const {
    name,
    password,
    device_id,
    address,
    phoneNumber,
    bloodType,
    nextOfKin
  } = req.body;
  if (
    !name ||
    !password ||
    !device_id ||
    !req.file ||
    !address ||
    !phoneNumber ||
    !bloodType ||
    !nextOfKin
  ) {
    return res.status(400).json({ error: "all fields are required" });
  }
  const picture = req.file.path;

  bcrypt.hash(password, 8, (err, hash) => {
    if (err) {
      console.log("hash error");
      return res.status(500).json({ error: "couldn't register" });
    }

    User.create(
      {
        name,
        picture,
        device_id,
        password: hash,
        address,
        bloodType,
        nextOfKin,
        phoneNumber
      },
      err => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        const token = jwt.sign(
          {
            name,
            device_id,
            picture,
            address,
            bloodType,
            nextOfKin,
            phoneNumber,
            loginMode: "user"
          },
          keys.JWT_USER_KEY
        );
        res.json({ message: "success", token: token });
      }
    );
  });
});

//login
router.post("/login", async (req, res) => {
  if (!req.body.name || !req.body.password) {
    return res.json({ error: "name and password are both required" });
  }
  const { name, password } = req.body;
  const user = await User.findOne({ name: name }).exec();
  if (!user) {
    return res.json({ error: "Auth fail" });
  }
  const auth = await bcrypt.compare(password, user.password);
  if (auth === false) {
    return res.status(401).json({
      error: "name or password is incorrect"
    });
  }
  const token = jwt.sign(
    {
      name: user.name,
      device_id: user.device_id,
      picture: user.picture,
      address: user.address,
      bloodType: user.bloodType,
      nextOfKin: user.nextOfKin,
      phoneNumber: user.phoneNumber,
      loginMode: "user",
      isAdmin: user.isAdmin
    },
    keys.JWT_USER_KEY
  );
  return res.status(200).json({ message: "success", token: token });
});

// get all users
router.get("/", authAdmin, async (req, res) => {
  const users = await User.find({}).exec();
  return res.send(users);
});
// get user by id
router.get("/:id", async (req, res) => {
  user = await User.findById(req.params.id).exec();
  return res.json({ user: user });
});
//delete user by id
router.delete("/:id", authAdmin, async (req, res) => {
  user = await User.findByIdAndDelete(req.params.id);
  return res.send(user._id);
});
// edit user
router.put("/:id", authAdmin, upload.single("picture"), async (req, res) => {
  if (req.file) {
    req.body.picture = req.file.path;
  }
  if (req.body.password) {
    const hash = bcryptSync.hash(req.body.password, 8);
    // if (err) {
    //   console.log("hash error");
    //   return res.status(500).json({ error: "couldn't update" });
    // }
    req.body.password = hash;
  }
  user = await User.findOneAndUpdate({ _id: req.params.id }, req.body).exec();
  updatedUser = await User.findById(req.params.id).exec();
  return res.json({ user: updatedUser });
});
module.exports = router;
