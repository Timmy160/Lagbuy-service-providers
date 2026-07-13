import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./Pages/Navbar.jsx";

import ServiceProviders from "./Pages/ServiceProviders.jsx";
import AcademyHome from "./Pages/AcademyHome.jsx";
import CourseDetails from "./Pages/CourseDetails.jsx";
import PaymentSuccess from "./Pages/PaymentSuccess.jsx";
import CourseWelcomeAuth from "./Pages/CourseWelcomeAuth.jsx";
import Logout from "./Pages/Logout.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
 
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<ServiceProviders />} />
          <Route path="/academy" element={<AcademyHome />} />
          <Route path="/course-auth" element={<CourseWelcomeAuth />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Protected routes */}
          <Route
            path="/course-details"
            element={
              <ProtectedRoute>
                <CourseDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-success"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;