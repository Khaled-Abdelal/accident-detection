const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  // ...
  app.use(proxy("/api/**", { target: "http://localhost:5000/" }));
  app.use(proxy("/api", { target: "http://localhost:5000/" }));
  app.use(proxy("/uploads", { target: "http://localhost:5000/" }));
  app.use(proxy("/socket.io", { target: "http://localhost:5000/" }));
  // app.use(proxy("//sockjs-node.", { target: "wss://localhost:5000/" }));
};
