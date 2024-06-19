import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Component/navbar/Navbar';
import Loginsignup from './pages/Loginsignup';
import Login from './pages/Login';
import Footer from './Component/footer/Footer';
function App() {
  return (
    <Router>
      <div>
       <Navbar />
        
        <Routes>
         <Route path="/" element={<Loginsignup />} />
         <Route path="/signup" element={<Loginsignup />} />
         <Route path="/login" element={<Login />} />
        
        </Routes>
        <Footer />
    
    
      </div>

   </Router>
  
 
   
  );
}

export default App;
