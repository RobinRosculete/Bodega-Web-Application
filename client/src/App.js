import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Axios from "axios";
//Pages
import Browser from "./pages/Browser/Browser";
import Welcome from "./pages/Welcome/Welcome";
import YourShop from "./pages/Individual Shop/IndividualShop";
import Header from "./components/header/Header";
import Footer from "./components/botHeader/botHeader";
import CreateCFOShop from "./pages/Forms/CreateCFOShop";
import CreateCustomer from "./pages/Forms/CreateCustomer";
import CustomerAccount from "./pages/Individual Shop/CustomerProfile";
import Support from "./pages/Support/support";
import Login from "./pages/Login/Login";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await Axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="Initial page">
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} /> {}
        <Route path="/browser" element={<Browser />} />
        <Route path="/CFO-Shop-Creation" element={<CreateCFOShop />} />
        <Route path="/Customer-Account-Creation" element={<CreateCustomer />} />
        <Route path="/yourshop" element={<YourShop />} />
        <Route path="/customeraccount" element={<CustomerAccount />} />
        <Route path="/Support" element={<Support />} />
        <Route
          exact
          path="/Login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
