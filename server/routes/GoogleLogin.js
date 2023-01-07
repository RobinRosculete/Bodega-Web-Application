//Create CFO Shop Rounting file
const express = require("express");
const passport = require("passport");
const router = express.Router();
const clientPort = process.env.CLIENT_PORT;

const succesLoginUrl = `http://localhost:${clientPort}`;
const failureLoginUrl = `http://localhost:${clientPort}/support`;

//Route for succesfull authentification
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot log in with Google, please try again later.",
    failureRedirect: failureLoginUrl,
    successRedirect: succesLoginUrl,
  }),
  (req, res) => {
    console.log("User", req.user);
    res.send("Thank you for singing in!");
  }
);

module.exports = router;
