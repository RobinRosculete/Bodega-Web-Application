const express = require("express");
const LoginDbServices = require("../database/LoginDbServices");
const router = express.Router();

router.post("/login", (req, res) => {
  //console.log(req.body.emailLogin, req.body.passwordLogin);
  const db = LoginDbServices.getLoginDbInstance();
  const emailLogin = req.body.emailLogin;
  const passwordLogin = req.body.passwordLogin;


  const selectVariables = [
    emailLogin,
    passwordLogin,
  ];

  const result = db.selectCFOLogin(selectVariables);
  //result.then(res.send("Successfully retrieved."));
  result.then((CFOShops) => res.json(CFOShops));
  //result.then((CFOShops) => console.log(CFOShops));
  result.catch((err) => console.log(err));
});

module.exports = router;
