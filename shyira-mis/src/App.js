import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Navbar from './Component/navbar/Navbar';
import SignIn from './pages/Signup'
//import Footer from './Component/footer/Footer';
import AdminDashboard from './pages/Dashboards/admindashboard/AdminDashboard';
import ProtectedRoute from './Component/ProtectedRoute';
import LogisticDashboard from './pages/Dashboards/logisticdashboard/LogisticDashboard';
import AccountantDashboard from './pages/Dashboards/accountantdashboard/AccountantDashboard'
import DafDashboard from './pages/Dashboards/dafdashboard/dafdashboard'
import HodDashboard from './pages/Dashboards/HodDashboard/hoddashboard'


function App() {
  return (
    <Router>
      <div>
      
        <Routes>
        
          <Route path="/" element={<SignIn />} />
          <Route path="/admin-dashboard/*" element={<ProtectedRoute component={AdminDashboard} />} />
          <Route path="/logistic/*" element={<ProtectedRoute component={LogisticDashboard} />} />
          <Route path="/accountant/*" element={<ProtectedRoute component={AccountantDashboard} />} />
          <Route path="/hod/*" element={<ProtectedRoute component={HodDashboard} />} />
          <Route path="/daf/*" element={<ProtectedRoute component={DafDashboard} />} />
          
        </Routes>
      </div>
    </Router>
  
   
  );
}

export default App;
