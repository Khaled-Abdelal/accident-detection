const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 5000;

const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/Hospital");
require("./models/User");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
  req.io = io;
  next();
});
// hospital routes
app.use("/api/hospital", require("./routes/hospital"));
// accident routes
app.use("/api/accident", require("./routes/accident"));
//user routes
app.use("/api/user", require("./routes/user"));

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true
});

io.on("connection", socket => {
  console.log("New client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
  socket.on("join", data => {
    console.log(data.id);
    socket.join(data.id); // We are using room of socket io
  });
});

if (process.env.NODE_ENV === "production") {
  // serve static files
  app.use(express.static("front-end/build"));
  /// serve the index.html in production
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front-end", "build", "index.html"));
  });
}

http.listen(PORT, function() {
  console.log("listening on localhost:" + PORT);
});
