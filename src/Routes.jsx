import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ContentManagement from './pages/content-management';
import AdminDashboard from './pages/admin-dashboard';
import AdminLogin from './pages/admin-login';
import LandingPage from './pages/landing-page';
import UserManagement from './pages/user-management';
import PaymentProcessing from './pages/payment-processing';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/content-management" element={<ContentManagement />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/payment-processing" element={<PaymentProcessing />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
