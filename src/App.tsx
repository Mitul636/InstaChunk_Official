/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/HomePage";
import SharedHostingPage from "./pages/SharedHostingPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPlans from "./pages/AdminPlans";
import AdminNavbar from "./pages/AdminNavbar";
import AdminCurrencySettings from "./pages/AdminCurrencySettings";
import AdminOrderSettings from "./pages/AdminOrderSettings";
import FreePlansPage from "./pages/FreePlansPage";
import OrderPage from "./pages/OrderPage";
import AdminFreePlans from "./pages/AdminFreePlans";
import { useAppStore } from "./store";

function AppContent() {
  const { currencyInitialized, setCurrencyInitialized, setCurrency, settings } =
    useAppStore();

  useEffect(() => {
    if (!currencyInitialized) {
      const initCurrency = async () => {
        if (settings.autoDetectCurrency) {
          try {
            // Using ipwho.is which is free and supports HTTPS
            const response = await fetch("https://ipwho.is/");
            const data = await response.json();
            if (data && data.country_code) {
              if (data.country_code === "IN") {
                setCurrency("INR");
              } else if (data.country_code === "BD") {
                setCurrency("BDT");
              } else {
                setCurrency("USD");
              }
            } else {
              setCurrency(settings.defaultCurrency);
            }
          } catch (e) {
            setCurrency(settings.defaultCurrency);
          }
        } else {
          setCurrency(settings.defaultCurrency);
        }
        setCurrencyInitialized(true);
      };
      initCurrency();
    }
  }, [
    currencyInitialized,
    setCurrencyInitialized,
    setCurrency,
    settings.autoDetectCurrency,
    settings.defaultCurrency,
  ]);

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shared-hosting" element={<SharedHostingPage />} />
        <Route path="/services" element={<SharedHostingPage />} />
        <Route path="/free-plans" element={<FreePlansPage />} />
        <Route path="/order/:planSlug" element={<OrderPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/navbar" element={<AdminNavbar />} />
        <Route path="/admin/plans" element={<AdminPlans />} />
        <Route path="/admin/currency" element={<AdminCurrencySettings />} />
        <Route path="/admin/order-settings" element={<AdminOrderSettings />} />
        <Route path="/admin/free-plans" element={<AdminFreePlans />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
