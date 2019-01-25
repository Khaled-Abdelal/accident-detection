const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const location = req.body.location;
  console.log("route hit location " + location + " io " + req.io.sockets);

  req.io.sockets
    .in("5c4245caf4873a5d5aecf057")
    .emit("accident", { location: location });
  res.end();
});

module.exports = router;
