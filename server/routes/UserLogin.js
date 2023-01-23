const express = require("express");
const LoginDbServices = require("../database/LoginDbServices");
const router = express.Router();

router.post("/login", (req, res) => {
  const db = LoginDbServices.getLoginDbInstance();
  const emailLogin = req.body.emailLogin;
  const passwordLogin = req.body.passwordLogin;


  const selectVariables = [
    emailLogin,
    passwordLogin,
  ];

  const result = db.selectLoginID(selectVariables);
  console.log(result);
  result.then((idnumber) => res.json(idnumber));
  result.catch((err) => console.log(err));
});

router.post("/login2", (req, res) => {
  const db = LoginDbServices.getLoginDbInstance();
  const idLogin = req.body.idLogin;


  const result = db.selectCFOShopByLoginID(idLogin);
  console.log(result);
  result.then((CFOShops) => res.json(CFOShops));
  //result.then((CFOShops) => res(CFOShops));
  result.catch((err) => console.log(err));

});


module.exports = router;
