const jsonServer = require("json-server");
const auth = require("json-server-auth");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// Áp dụng middleware mặc định
server.use(middlewares);

// Áp dụng middleware json-server-auth
server.use(auth);

// Router cho API
server.use(router);

// Chạy server trên cổng 3000
server.listen(3000, () => {
  console.log("JSON Server with Auth is running on http://localhost:3000");
});