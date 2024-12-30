const express = require("express");
const app = express();
// Middleware
app.use(express.json());

const orderRoute = require("./src/Order/Route/routes");
const transactionRoute = require("./src/Transaction/Route/routes");
const userRoute = require("./src/User/Route/routes");

app.use("/api", orderRoute);
app.use("/api", transactionRoute);
app.use("/api", userRoute);

app.listen(6000, () => {
  console.log("server is running on port 6000");
});
