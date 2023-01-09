//Create CFO Shop Rounting file
const express = require("express");
const passport = require("passport");
const router = express.Router();

const succesLoginUrl = `${process.env.CLIENT_URL}`;
const failureLoginUrl = `${process.env.CLIENT_URL}/Login`;

//Route for succesfull authentification
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot log in with Google, please try again later.",
    successRedirect: succesLoginUrl,
    failureRedirect: failureLoginUrl,
  }),
  (req, res) => {
    console.log("User", req.user);
    res.send("Thank you for singing in!");
    res.redirect(succesLoginUrl);
  }
);

module.exports = router;
