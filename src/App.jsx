import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

 
import ServiceProviders from "./Pages/ServiceProviders.jsx";
import AcademyHome from "./Pages/AcademyHome.jsx";
import CourseDetails from "./Pages/CourseDetails.jsx";
import PaymentSuccess from "./Pages/PaymentSuccess.jsx";
import CourseWelcomeAuth from "./Pages/CourseWelcomeAuth.jsx";

  
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ServiceProviders />} />
        <Route path="/academy" element={<AcademyHome />} />
        <Route path="/course-auth" element={<CourseWelcomeAuth />} />
        <Route path="/course-details" element={<CourseDetails />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
