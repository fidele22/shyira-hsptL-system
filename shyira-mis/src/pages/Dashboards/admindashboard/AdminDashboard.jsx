import React, { useState } from 'react';
import Navbar from './Navigationbar';
import AdminOverview from './AdminOverview';
import ViewUser from './users'
import AddUser from './AddUser';

import './css/admin.css';

const LogisticDashboard = () => {
  const [currentPage, setCurrentPage] = useState('overview');

  const renderContent = () => {
    switch (currentPage) {
      case 'adminoverview':
        return <AdminOverview />;
      case 'add-user':
        return <AddUser />;
      case 'view-Users':
        return <ViewUser />;
      
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="logistic-dashboard">
      <Navbar setCurrentPage={setCurrentPage} />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default LogisticDashboard;
