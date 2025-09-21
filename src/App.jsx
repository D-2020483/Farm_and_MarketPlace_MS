import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import HomePage from "./pages/home.page";
import FarmerLogin from "./pages/F_login.page";
import BuyerLogin from "./pages/B_login.page";
import AdminLogin from "./pages/A_login.page";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />
        <Route path="/buyer-login" element={<BuyerLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        
      </Routes>
    </Router>
  );
}

export default App;