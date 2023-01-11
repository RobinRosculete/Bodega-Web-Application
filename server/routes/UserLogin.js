const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  console.log(req.body.emailLogin, req.body.passwordLogin);
});

module.exports = router;
