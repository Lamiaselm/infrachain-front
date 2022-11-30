import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Client from "../pages/Client";
import Provider from "../pages/Provider";
import Provider2 from "../pages/Provider2";
import Authority from "../pages/Authority";
import MarketPlace from "../pages/MarketPlace";
import MarketPlaceCust from "../pages/MarketPlaceCust";

// import { store } from '../redux'

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      {/* <Route index element={<MainMap />} /> */}
      <Route path="/auth/client" element={<Client />} />
      <Route path="/auth/provider" element={<Provider />} />
      <Route path="/auth/provider2" element={<Provider2 />} />
      <Route path="/auth" element={<Authority />} />
      <Route path="/auth/provider/market" element={<MarketPlace />} />
      <Route path="/marketCust" element={<MarketPlaceCust />} />
    </Route>
  </Routes>
);

export default AppRouter;
