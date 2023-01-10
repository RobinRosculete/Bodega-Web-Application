import React, { useState } from "react";
import Axios from "axios";
import Style from "./forms.module.css";

function CreateCustomer() {
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerMiddleName, setCustomerMiddleName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerAddress1, setCustomerAddress1] = useState("");
  const [customerAddress2, setCustomerAddress2] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerState, setCustomerState] = useState("");
  const [customerZipcode, setCustomerZipcode] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  //Reset to clear form
  const clearForm = () => {
    //clear all input values in the form
    setCustomerFirstName("");
    setCustomerLastName("");
    setCustomerMiddleName("");
    setCustomerAddress1("");
    setCustomerAddress2("");
    setCustomerCity("");
    setCustomerState("");
    setCustomerZipcode("");
    setCustomerPhoneNumber("");
    setCustomerEmail("");
  };

  //Axios alert message not working properly, alert message not beeing displayed
  const submitCustomer = () => {
    Axios.post(
      `${process.env.REACT_APP_API_URL}/Customer-Account-Creation/CustomerInsertion`,
      {
        customerFirstName: customerFirstName,
        customerMiddleName: customerMiddleName,
        customerLastName: customerLastName,
        customerAddress1: customerAddress1,
        customerAddress2: customerAddress2,
        customerCity: customerCity,
        customerState: customerState,
        customerZipcode: customerZipcode,
        customerPhoneNumber: customerPhoneNumber,
        customerEmail: customerEmail,
      }
    ).then(() => {
      alert("Successfully added Customer");
    });
  };

  return (
    //CREATE Customer PROFILE PAGE
    <div className={Style.formdiv}>
      <form onReset={clearForm}>
        <h2>Create Customer</h2>
        <label>Full Name</label>
        <input
          type="text"
          id="customerFirstName"
          placeholder="First name"
          onChange={(e) => {
            setCustomerFirstName(e.target.value);
          }}
        />

        <input
          type="text"
          id="customerMiddleName"
          placeholder="Middle name"
          onChange={(e) => {
            setCustomerMiddleName(e.target.value);
          }}
        />

        <input
          type="text"
          id="customerLastName"
          placeholder="Last name"
          onChange={(e) => {
            setCustomerLastName(e.target.value);
          }}
        />

        <label>Phone Number</label>
        <input
          type="tel"
          id="customerPhoneNumber"
          name="phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="123-456-6789"
          onChange={(e) => {
            setCustomerPhoneNumber(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="email"
          id="customerEmail"
          placeholder="Email address"
          onChange={(e) => {
            setCustomerEmail(e.target.value);
          }}
        />
        <label htmlFor=""> Address</label>
        <input
          type="address1"
          id="customerAddress1"
          placeholder="address1"
          onChange={(e) => {
            setCustomerAddress1(e.target.value);
          }}
        />
        <input
          type="address2"
          id="customerAddress2"
          placeholder="address2"
          onChange={(e) => {
            setCustomerAddress2(e.target.value);
          }}
        />
        <input
          type="city"
          id="customerCity"
          placeholder="City"
          onChange={(e) => {
            setCustomerCity(e.target.value);
          }}
        />
        <input
          type="state"
          id="customerState"
          placeholder="State"
          onChange={(e) => {
            setCustomerState(e.target.value);
          }}
        />
        <input
          type="zip"
          className="form-control"
          id="customerZipcode"
          placeholder="Zip"
          onChange={(e) => {
            setCustomerZipcode(e.target.value);
          }}
        />

        <button onClick={submitCustomer}>Submit</button>

        <button type="reset" onClick={clearForm}>
          Reset
        </button>
      </form>
      <br />
      <br />
    </div>
  ); //end return
}

export default CreateCustomer;
