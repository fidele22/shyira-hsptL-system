import React, { useState } from 'react';
import Navigation from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Navbar from './Navigationbar/Dafnavigationbar';
import Overview from './Overview';
import ViewRequest from './request/ViewRequest'
//import AddItem from './AddItem';
import DafProfile from './DafProfile'
//import OrderSupplies from './OrderSupplies';
import './DafDashboard.css';


const LogisticDashboard = () => {
  const [currentPage, setCurrentPage] = useState('overview');

  const renderContent = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview />;
     case 'view-request':
          return <ViewRequest />;
      case 'logistic-profile':
          return <DafProfile />;

      default:
        return <Overview />;
    }
  };

  return (
    <div className="daf-dashboard">
      <Navigation />
      <Navbar setCurrentPage={setCurrentPage} />

      <div className="dafcontent">
        {renderContent()}
        <Footer />
      </div>
    </div>
  );
};

export default LogisticDashboard;
