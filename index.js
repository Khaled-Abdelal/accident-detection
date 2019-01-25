const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 5000;

const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/Hospital");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});
// hospital routes
app.use("/api/hospital", require("./routes/hospital"));
// accident routes
app.use("/api/accident", require("./routes/accident"));

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true, useCreateIndex: true }
);
app.get("/", (req, res) => {
  res.send("hello");
});

io.on("connection", socket => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
  socket.on("join", data => {
    console.log(data.id);
    socket.join(data.id); // We are using room of socket io
  });
});

http.listen(PORT, function() {
  console.log("listening on localhost:" + PORT);
});
