//Create CFO Shop Rounting file
const express = require("express");
//const app = require("../config/app");
const router = express.Router();

router.post("/cfo-register", function (req, res) {
  console.log("cfo-register");
  console.log(req.body.registerEmail, req.body.registerPassword);
});

router.post("/customer-register", function (req, res) {
  console.log("customer-register");
  console.log(
    "email: ",
    req.body.registerEmail,
    "password: ",
    req.body.registerPassword
  );
});
module.exports = router;
