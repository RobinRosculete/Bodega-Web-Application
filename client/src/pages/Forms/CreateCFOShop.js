import React, { useState } from "react";
import Style from "./froms.module.css";
import Axios from "axios";
import clearForm from "./CreateCustomer.js";
import "../Individual Shop/IndividualShop.js";

function CreateCFOShop() {
  const [cfoShopName, setCfoShopName] = useState("");
  const [cfoFirstName, setCfoFirstName] = useState("");
  const [cfoMiddleName, setCfoMiddleName] = useState("");
  const [cfoLastName, setCfoLastName] = useState("");
  const [cfoPhoneNumber, setCfoPhoneNumber] = useState("");
  const [cfoEmail, setCfoEmail] = useState("");
  const [cfoFoodTag, setCfoFoodTag] = useState("");
  const [cfoWebsite, setCfoWebsite] = useState("");
  const [cfoAddress1, setCfoAddress1] = useState("");
  const [cfoAddress2, setCfoAddress2] = useState("");
  const [cfoCity, setCfoCity] = useState("");
  const [cfoState, setCfoState] = useState("");
  const [cfoZip, setCfoZip] = useState("");
  //Axios alert message not working properly, alert message not beeing displayed
  const submitCFOShop = () => {
    Axios.post(
      `${process.env.REACT_APP_API_URL}/CFO-Shop-Creation/CFO-Shop-Insertion`,
      {
        cfoShopName: cfoShopName,
        cfoFirstName: cfoFirstName,
        cfoMiddleName: cfoMiddleName,
        cfoLastName: cfoLastName,
        cfoPhoneNumber: cfoPhoneNumber,
        cfoEmail: cfoEmail,
        cfoFoodTag: cfoFoodTag,
        cfoWebsite: cfoWebsite,
        cfoAddress1: cfoAddress1,
        cfoAddress2: cfoAddress2,
        cfoCity: cfoCity,
        cfoState: cfoState,
        cfoZip: cfoZip,
      }
    ).then(() => {
      alert("Successfully added CFO Shop");
    });
  };

  return (
    //CREATE CFO PROFILE PAGE

    <div className={Style.formdiv}>
      <form onReset={clearForm}>
        <h2>Create CFO Shop</h2>
        <label>Full Name</label>
        <input
          type="text"
          id="cfoShopName"
          placeholder="CFO Shop Name"
          pattern="^[A-Za-z]&"
          required="true"
          title="Letters only!"
          onChange={(e) => {
            setCfoShopName(e.target.value);
          }}
        />
        <input
          type="text"
          id="cfoFirstName"
          placeholder="First name"
          pattern="^[A-Za-z]&"
          required="true"
          title="Letters only!"
          onChange={(e) => {
            setCfoFirstName(e.target.value);
          }}
        />
        <input
          type="text"
          id="cfoMiddleName"
          placeholder="Middle name"
          onChange={(e) => {
            setCfoMiddleName(e.target.value);
          }}
        />
        <input
          type="text"
          id="cfoLastName"
          placeholder="Last name"
          onChange={(e) => {
            setCfoLastName(e.target.value);
          }}
        />
        <label>Phone Number</label>
        <input
          type="tel"
          id="cfoPhoneNumber"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}"
          placeholder="123-45-6789"
          onChange={(e) => {
            setCfoPhoneNumber(e.target.value);
          }}
        />
        <label>Email Address</label>
        <input
          type="email"
          id="cfoEmail"
          placeholder="Email address"
          onChange={(e) => {
            setCfoEmail(e.target.value);
          }}
        />
        <label htmlFor="foodTag">Food Tag</label>
        <input
          type="text"
          id="cfoFoodTag"
          name="FoodTag"
          placeholder="Food Tags"
          onChange={(e) => {
            setCfoFoodTag(e.target.value);
          }}
        />
        <label htmlFor="Website">Website</label>
        <input
          type="url"
          id="setCfoWebsite"
          name="website"
          placeholder="link"
          onChange={(e) => {
            setCfoWebsite(e.target.value);
          }}
        />
        <label htmlFor=""> Address 1</label>
        <input
          type="address1"
          id="cfoAddress1"
          placeholder="First Address"
          onChange={(e) => {
            setCfoAddress1(e.target.value);
          }}
        />
        <label htmlFor=""> Address 2</label>
        <input
          type="address2"
          id="cfoAddress2"
          placeholder="Second Address"
          onChange={(e) => {
            setCfoAddress2(e.target.value);
          }}
        />

        <input
          type="city"
          id="cfoCity"
          placeholder="City"
          onChange={(e) => {
            setCfoCity(e.target.value);
          }}
        />

        <input
          type="state"
          id="cfoState"
          placeholder="State"
          onChange={(e) => {
            setCfoState(e.target.value);
          }}
        />

        <input
          type="zip"
          className="form-control"
          id="cfoZip"
          placeholder="Zip"
          onChange={(e) => {
            setCfoZip(e.target.value);
          }}
        />

        <label htmlFor="Menu">Upload Menu</label>
        <input
          type="file"
          id="Menu"
          name="File Name"
          accept="application/pdf"
        />

        <button onClick={submitCFOShop}>Submit</button>
        <button type="reset" value="Reset">
          Reset
        </button>
      </form>
      <br />
      <br />
    </div>
  ); //end
}

export default CreateCFOShop;
