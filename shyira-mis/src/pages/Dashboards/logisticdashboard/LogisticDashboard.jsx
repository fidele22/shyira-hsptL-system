import React, { useState } from 'react';
import Navigation from '../navbar/Navbar'
import Navbar from './Navigationbar/Navigationbar';
import Footer from '../footer/Footer'
import Overview from './Overview';
import ViewItem from './addItem/parentStock'
import AddItem from './addItem/addingitem';
import MakeRequist from './Requests/MakeRequist'
import ApprovedOrder from './OrderSupply/approvedOrder'
import ReceivedOrder from './OrderSupply/RecievedOrder'

import LogisticProfile from './LogisticProfile'
import StockReport from './StockReport/ItemReport';
import ViewRequisition from './Requests/RequisitionReceive';
import ViewFuelRequest from './fuelRequisition/viewfuelRequest'
import AddCarplaque from './fuelRequisition/addcarplaque'
import ApprovedRequests from './Requests/approvedRequest';
import RequisitionReceive from './receivedRequisitions/itemRequestReceived';
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

      case 'make-order':
        return <MakeRequist />;
      case 'approved-order':
          return <ApprovedOrder />;

       case 'received-order':
        return <ReceivedOrder />; 
     
      case 'fuel-requisition':
        return <ViewFuelRequest />;
      case 'carplaque':
        return <AddCarplaque />
           
      case 'approved-request':
        return <ApprovedRequests />;  
     
      case 'logistic-profile':
        return <LogisticProfile />;
      case 'view-requisition':
        return <ViewRequisition />;

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
