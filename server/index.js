const config = require("./config/index.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = require("./config/index.js");

const startServer = async () => {
  const app = express();
  console.log(`NODE_ENV=${config.NODE_ENV}`);

  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const createCFOProfileRoute = require("./routes/CFOShopCreation");
  app.use("/CFO-Shop-Creation/", createCFOProfileRoute);

  const createCustomerProfileRoute = require("./routes/CustomerAccountCreation");
  app.use("/Customer-Account-Creation/", createCustomerProfileRoute);

  const userLogin = require("./routes/UserLogin");
  app.use("/User-Login/", userLogin);

  app.listen(PORT, () => {
    console.log(`Spun up on ${PORT}`);
  });
};

startServer();
