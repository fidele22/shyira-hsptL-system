import React, { useState } from 'react';
import Navigation from '../navbar/Navbar'
import Navbar from './Navigationbar/Navigationbar';
import Footer from '../footer/Footer'
import Overview from './Overview';
import ViewItem from './viewItems/Viewitem'
import AddItem from './addItem/addingitem';
import MakeRequist from './Requests/MakeRequist'
import LogisticProfile from './LogisticProfile'
import OrderSupplies from './OrderSupplies';
import RequisitionReceive from './Requests/RequisitionReceive'
import './contentCss/LogisticDashboard.css';

const LogisticDashboard = () => {
  const [currentPage, setCurrentPage] = useState('overview');

  const renderContent = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview />;
      case 'add-item':
        return <AddItem />;
      case 'view-items':
        return <ViewItem />;
      case 'order-supplies':
        return <OrderSupplies />;
      case 'make-requist':
        return <MakeRequist />;
      case 'logistic-profile':
        return <LogisticProfile />;
      case 'requisition-receive':
        return <RequisitionReceive />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="logistic-dashboard">
      <Navigation />
      <Navbar setCurrentPage={setCurrentPage} />
      
      <div className="content">
        {renderContent()}
        <Footer />
      </div>
    </div>
  );
};

export default LogisticDashboard;
