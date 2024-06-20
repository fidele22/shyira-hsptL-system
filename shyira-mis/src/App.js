import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Component/navbar/Navbar';
import Login from './pages/Login';
import Loginsignup from './pages/Loginsignup';
import Footer from './Component/footer/Footer';
function App() {
  return (
    <Router>
      <div>
       <Navbar />
        
        <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Loginsignup />} />
        
        </Routes>
        <Footer />
    
    
      </div>

   </Router>
  
 
   
  );
}

export default App;
