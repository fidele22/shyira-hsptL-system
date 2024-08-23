import React, { useState } from 'react';
import Navbar from './adminNavbar/Navigationbar';
import Navigation from '../navbar/Navbar';
import Footer from '../footer/Footer';
import AdminOverview from './AdminOverview';
import ViewUser from './users'
import AddUser from './AddUser';
import UserRole from './AddRole'
import Service from './addService'
import ViewS from './ViewServices'
import Position from './AddPosition'
import ViewP from './viewPosition'
import Department from './AddDepartment'
import ViewD from './viewDepartment'

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
      case 'user-roles':
        return <UserRole />


      case 'add-service':
        return <Service />;
      case 'view-service':
        return <ViewS />;
      case 'add-position':
        return <Position />;
      case 'view-position':
        return <ViewP />;
      case 'add-department':
        return <Department />;
      case 'view-department':
        return <ViewD />;

      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="logistic-dashboard">
       <Navigation />
      <Navbar setCurrentPage={setCurrentPage} />
      <div className="Admincontent">
        {renderContent()}
        <Footer />
      </div>
    </div>
  );
};

export default LogisticDashboard;
