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
          <div key={business.CFO_id} className="food-business">
            <h3>{business.CFO_Shop_Name}</h3>
            <p>{business.CFO_firstname}</p>
            <p>{business.CFO_lastname}</p>
            <p>{business.CFO_food_tag}</p>
            <p>{business.address1}</p>
            <p>{business.address2}</p>
            <p>{business.state}</p>
            <p>{business.city}</p>
            <p>{business.zipcode}</p>
            <p>{business.phone_number}</p>
            <p>{business.email_address}</p>
            <p>{business.CFO_website_link}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default TestPage;
