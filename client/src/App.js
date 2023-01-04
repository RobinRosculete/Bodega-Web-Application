import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
//Pages
import Browser from "./pages/Browser/Browser";
import Welcome from "./pages/Welcome/Welcome";
import YourShop from "./pages/Individual Shop/IndividualShop";
import Header from "./components/header/Header";
import Footer from "./components/botHeader/botHeader";
import CreateCFOShop from "./pages/Forms/CreateCFOShop";
import CreateCustomer from "./pages//Forms/CreateCustomer";
import CustomerAccount from "./pages/Individual Shop/CustomerProfile";
import Support from "./pages/Support/support";
import Login from "./pages/Login/Login";

function App() {
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
        <Route path="/Login" element={<Login />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
