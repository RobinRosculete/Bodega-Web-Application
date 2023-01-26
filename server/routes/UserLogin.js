const express = require("express");
const LoginDbServices = require("../database/LoginDbServices");
const router = express.Router();

//Login Verification, returns LoginID
router.post("/login", (req, res) => {
  const db = LoginDbServices.getLoginDbInstance();
  const emailLogin = req.body.emailLogin;
  const passwordLogin = req.body.passwordLogin;

  console.log("emailLogin is now in backend: ", emailLogin);
  console.log("passwordLogin is now in backend: ", passwordLogin);

  const selectVariables = [
    emailLogin,
    passwordLogin,
  ];

  const result = db.selectLoginID(selectVariables);
  console.log(result);
  result.then((idnumber) => res.send(idnumber));
    //result.then((CFOShops) => res.json(CFOShops));
  result.catch((err) => console.log(err));
});

//CFO Shop Login ID retrieval
router.post("/logina", (req, res) => {
  const db = LoginDbServices.getLoginDbInstance();
  const idLogin = req.body.idLogin;

  //const selectVariables = [
  //  idLogin,
  //];

  console.log("ID is now in backend: ", idLogin);

  var result = db.selectCFOShopByLoginID(idLogin);

  result.then((CFOShops) => res.send(CFOShops));
  //result.then((CFOShops) => res.json(CFOShops));
  result.catch((err) => console.log(err));

});


//Customer Login ID retrieval
router.post("/loginb", (req, res) => {
  const db = LoginDbServices.getLoginDbInstance();
  const idLogin = req.body.idLogin;

  //const selectVariables = [
  //  idLogin,
  //];

  console.log("ID is now in backend: ", idLogin);

  var result = db.selectCustomerByLoginID(idLogin);

  result.then((Customers) => res.send(Customers));
  //result.then((CFOShops) => res.json(CFOShops));
  result.catch((err) => console.log(err));

});



module.exports = router;
