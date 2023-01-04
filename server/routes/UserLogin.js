//Create CFO Shop Rounting file
const express = require("express");
//const app = require("../config/app");
const router = express.Router();

router.post("/login", (req, res) => {
  console.log(req.body.emailLogin, req.body.passwordLogin);
});

module.exports = router;
