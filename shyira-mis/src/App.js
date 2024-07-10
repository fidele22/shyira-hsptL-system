import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Navbar from './Component/navbar/Navbar';
import Login from './pages/Login';
import Loginsignup from './pages/Loginsignup';
//import Footer from './Component/footer/Footer';
import AdminDashboard from './pages/Dashboards/admindashboard/AdminDashboard';
import ProtectedRoute from './Component/ProtectedRoute';
import LogisticDashboard from './pages/Dashboards/logisticdashboard/LogisticDashboard';
import AccountantDashboard from './pages/Dashboards/accountantdashboard/AccountantDashboard'


function App() {
  return (
    <Router>
      <div>
      
        <Routes>
        
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Loginsignup />} />
          <Route path="/admin-dashboard/*" element={<ProtectedRoute component={AdminDashboard} />} />
          <Route path="/logistic/*" element={<ProtectedRoute component={LogisticDashboard} />} />
          <Route path="/accountant/*" element={<ProtectedRoute component={AccountantDashboard} />} />
          
        </Routes>
      </div>
    </Router>
  
   
  );
}

export default App;
