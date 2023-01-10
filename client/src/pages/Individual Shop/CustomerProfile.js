import React, { useState } from "react";

import Axios from "axios";

function CustomerProfile(userDetails) {
  const [customerList, setCustomerlist2] = useState([]);
  const getCustomerdata = () => {
    Axios.get(
      `${process.env.REACT_APP_API_URL}/Customer-Account-Creation/Customer`
    ).then((response) => {
      console.log(response, "response only");
      console.log(response.data, "response.data only");
      console.log(response.customerFirstName, "response.firstname only");
      setCustomerlist2(response.data);
    });
  };

  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };

  return (
    <div className="View Customer Information">
      <h2>View Customer Information</h2>
      <button onClick={getCustomerdata}>Show Customer Data</button>
      {customerList.map((val, key) => {
        return (
          <div className="customer">
            <div>
              <h3>UserName</h3>
              <h3>customerFirstName: {val.customer_firstname}</h3>
              <h3>customerMiddleName: {val.customer_midlename}</h3>
              <h3>customerLastName: {val.customer_lastname}</h3>
              <h3>customerAddress1: {val.address1}</h3>
              <h3>customerAddress2: {val.address2}</h3>
              <h3>customerState: {val.state}</h3>
              <h3>customerCity: {val.city}</h3>
              <h3>customerZipcode: {val.zipcode}</h3>
              <h3>customerPhoneNumber: {val.phone_number}</h3>
              <h3>customerEmail: {val.email_address}</h3>
            </div>
            <button onClick={logout}>Log Out</button>
          </div>
        ); //end inner return
      })}
    </div>
  ); //end
} //end CustomerProfile

export default CustomerProfile;
