//import React, { useState } from "react";
//import Axios from "axios";
import Style from "./browser.module.css";

import React from 'react';

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],  // array of food businesses to display
    };
  }
  

  componentDidMount() {
    // fetch list of businesses
    fetch('http://localhost:3001/Test-Page/testpage/')
        .then((response) => response.json())
        .then((businesses) => {
            this.setState({ businesses });
    });
  }

  render() {
    const { businesses } = this.state;
    return (
      <div className={Style.formdiv}>
        {businesses.map((business) => (
          /*<div key={business.CFO_id} className={Style.icon}>*/
          <div key={business.CFO_id} className="food-business">
            <h2></h2>
            <h3>Food Business: {business.CFO_Shop_Name}</h3>
            <p>Owner: {business.CFO_firstname}{business.CFO_lastname}</p>
            <p>Located at: {business.address1}{business.address2}</p>
            <p>{business.state} {business.city}{business.zipcode}</p>
            <p>Please Contact at: {business.phone_number}{business.email_address}{business.CFO_website_link}</p>
            <p>Food Tags: {business.CFO_food_tag}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default TestPage;
