//Create CFO Shop Rounting file
const express = require("express");
//const app = require("../config/app");
const CfoShopDbServices = require("../database/CFOShopDbServices");
const router = express.Router();

router.post("/CFO-Shop-Insertion", (req, res) => {
  const db = CfoShopDbServices.getCFOShopDbInstance();
  const cfoShopName = req.body.cfoShopName;
  const cfoFirstName = req.body.cfoFirstName;
  const cfoMiddleName = req.body.cfoMiddleName;
  const cfoLastName = req.body.cfoLastName;
  const food_tag = req.body.cfoFoodTag;
  const website_link = req.body.cfoWebsite;
  const address1 = req.body.cfoAddress1;
  const address2 = req.body.cfoAddress2;
  const state = req.body.cfoState;
  const city = req.body.cfoCity;
  const zipcode = req.body.cfoZip;
  const phone_number = req.body.cfoPhoneNumber;
  const emai_address = req.body.cfoEmail;

  const insertVariables = [
    cfoShopName,
    cfoFirstName,
    cfoMiddleName,
    cfoLastName,
    food_tag,
    website_link,
    address1,
    address2,
    state,
    city,
    zipcode,
    phone_number,
    emai_address,
  ];

  const result = db.createNewCFOShop(insertVariables);
  //const result = db.updateCFOAddress(Adrress, 99);
  result.then(res.send("Successfully inserted"));

  result.catch((err) => console.log(err));
});

///Function purpose to get CFO shop information by ID
router.get("/CFOShopName", (req, res) => {
  const db = CfoShopDbServices.getCFOShopDbInstance();
  const fetchCFOId = req.params.id;
  const result = db.readCresult.then((CFOShop) => res.send(CFOShop));
  FOShopName(fetchCFOId);
  result.then((CFOShopName) => res.json({ CFOShopName: CFOShopName }));
  result.catch((err) => console.log(err));
});

// ----------------- WORKING -----------------
///Function purpose to get CFO shop information by ID
router.get("/CFOShop/", (req, res) => {
  const db = CfoShopDbServices.getCFOShopDbInstance();
  const getID = db.readLatestCFOShopID();

  //Geting the most recent CFO Shop added to the table
  getID.then((CFOId) => {
    const latestCFOId = CFOId[0]["MAX(CFO_id)"];
    const result = db.readCFOShop(latestCFOId);

    //Send Data to Frontend
    result.then((CFOShop) => res.send(CFOShop));
    result.catch((err) => console.log(err));
  });
});

//--------------------v-TESTING PAGE-----------------------01/11/2023 By Jonathan C.
///Function purpose to get CFO shop information by ID
router.get("/testpage/", (req, res) => {
  //res.set('Access-Control-Allow-Origin', '*');
  const db = CfoShopDbServices.getCFOShopDbInstance();

  const result = db.readAllCFOShops();
  //console.log("test: ", result);

  //Send Data to Frontend
  //result.then((CFOShops) => res.send(CFOShops));
  result.then((CFOShops) => res.json(CFOShops));
  //result.then((CFOShops) => console.log(CFOShops));
  result.catch((err) => console.log(err));
});


router.get("/browsing/", (req, res) => {
  //res.set('Access-Control-Allow-Origin', '*');
  const db = CfoShopDbServices.getCFOShopDbInstance();

    const result = db.readAllCFOShops();
    //console.log("test: ", result);

    //Send Data to Frontend
    //result.then((CFOShops) => res.send(CFOShops));
    result.then((CFOShops) => res.json(CFOShops));
    //result.then((CFOShops) => console.log(CFOShops));
    result.catch((err) => console.log(err));
  });

//--------------------^-TESTING PAGE-----------------------01/11/2023 By Jonathan C.
module.exports = router;
