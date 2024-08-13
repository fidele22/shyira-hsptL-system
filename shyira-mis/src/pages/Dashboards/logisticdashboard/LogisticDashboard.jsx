import React, { useState } from 'react';
import Navigation from '../navbar/Navbar'
import Navbar from './Navigationbar/Navigationbar';
import Footer from '../footer/Footer'
import Overview from './Overview';
import ViewItem from './addItem/parentStock'
import AddItem from './addItem/addingitem';
import MakeRequist from './Requests/MakeRequist'
import LogisticProfile from './LogisticProfile'
import StockReport from './StockReport/ItemReport';
import RequisitionReceive from './Requests/RequisitionReceive'
import ApprovedRequests from './Requests/approvedRequest';
import ImportItems from './addItem/uploadItems'
import './contentCss/LogisticDashboard.css';

const LogisticDashboard = () => {
  const [currentPage, setCurrentPage] = useState('overview');

  const renderContent = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview />;
      case 'add-item':
        return <AddItem />;
      case 'import-items':
        return <ImportItems />;  
      case 'view-items':
        return <ViewItem />;
      case 'report':
        return <StockReport />;
      case 'make-requist':
        return <MakeRequist />;
      
      case 'approved-request':
        return <ApprovedRequests />;  
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
      
      <div className="logisticcontent">
        {renderContent()}
        <Footer />
      </div>
    </div>
  );
};

export default LogisticDashboard;
