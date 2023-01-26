//Create CFO Shop Rounting file
const express = require("express");
//const app = require("../config/app");
const router = express.Router();
const LoginDbServices = require("../database/LoginDbServices");

router.post("/cfo-register", function (req, res) {
  const db = LoginDbServices.getLoginDbInstance();
  const email = req.body.registerEmail;
  const password = req.body.registerPassword;
  const registerCFOInsertData = [email, password];
  console.log("CFO Register Data: ", registerCFOInsertData);

  //db.createNewCFOAccount(registerCFOInsertData);
});

router.post("/customer-register", function (req, res) {
  const email = req.body.registerEmail;
  const password = req.body.registerPassword;
  const db = LoginDbServices.getLoginDbInstance();
  const registerCustomerInsertData = [email, password];
  console.log("Customer Register Data: ", registerCustomerInsertData);

  //db.createNewCustomerAccount(registerCustomerInsertData);
  //Code to store new user information in databas...
});

module.exports = router;
