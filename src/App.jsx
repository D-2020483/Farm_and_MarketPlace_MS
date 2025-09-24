import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CropProvider } from './context/CropContext';

import HomePage from "./pages/home.page";
import FarmerLogin from "./pages/F_login.page";
import BuyerLogin from "./pages/B_login.page";
import AdminLogin from "./pages/A_login.page";
import FarmerDashboard from "./pages/farmer-dashboard.page";
import AdminDashboard from "./pages/admin_dashboard.page";


const App = () => {
  return (
    <CropProvider>
      <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />
        <Route path="/buyer-login" element={<BuyerLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
    </CropProvider>
  );
}

export default App;