require("dotenv").config;
const config = require("./config/index.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./auht/passport");

const startServer = async () => {
  const app = express();
  console.log(`NODE_ENV=${config.NODE_ENV}`);

  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    cookieSession({
      name: "session",
      keys: [`${process.env.COOKIE_KEY}`],
      maxAge: 24 * 60 * 60 * 100,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const clientURL = `${process.env.CLIENT_URL}`;
  app.use(cors({ origin: clientURL, credentials: true }));

  const port = process.env.PORT;

  const createCFOProfileRoute = require("./routes/CFOShopCreation");
  app.use("/CFO-Shop-Creation/", createCFOProfileRoute);

  const createCustomerProfileRoute = require("./routes/CustomerAccountCreation");
  app.use("/Customer-Account-Creation/", createCustomerProfileRoute);

  const authRoute = require("./routes/GoogleLogin");
  app.use("/auth/", authRoute);

  const testPageRoute = require("./routes/CFOShopCreation");
  app.use("/Test-Page/", testPageRoute);

  const userLogin = require("./routes/UserLogin");
  app.use("/User-Login/", userLogin);

  app.get("/", (req, res) => {
    res.json({
      message: "🦄",
    });
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};
startServer();
