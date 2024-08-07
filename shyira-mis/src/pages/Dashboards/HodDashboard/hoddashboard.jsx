import React, { useState } from 'react';
import Navigation from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Navbar from './Navigationbar/Hodnavigationbar';
import Overview from './Overview';
import ViewRequest from './request/ViewRequest'
import MakeRequest from './request/MakeRequist'
//import AddItem from './AddItem';
import HodProfile from './HodProfile'
//import OrderSupplies from './OrderSupplies';
import './hodDashboard.css';
import ViewItems from './request/ViewItems';


const LogisticDashboard = () => {
  const [currentPage, setCurrentPage] = useState('overview');

  const renderContent = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview />;
      case 'requisition':
          return <MakeRequest />;
      case 'view-aproved':
          return <ViewItems />;
     case 'view-request':
          return <ViewRequest />;
      case 'logistic-profile':
          return <HodProfile />;

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
