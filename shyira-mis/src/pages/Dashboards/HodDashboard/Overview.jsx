import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './contentCss/overview.css';

const DashboardOverview = () => {
  const [userName, setUserName] = useState('');
  const [requestCount, setRequestCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejecteddCount , setRejectedCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const fullName = `${data.lastName}`;
          setUserName(fullName);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchDashboardStats = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/approve/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setRequestCount(response.data.requestCount);
          setApprovedCount(response.data.approvedCount);
          setRejectedCount(response.data.rejectedCount);
        } else {
          console.error('Failed to fetch dashboard stats');
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchUserData();
    fetchDashboardStats();
  }, []);

  return (
    <div className="hod-overview-content">
      <div className="welcome-nav">
      <h1>Welcome back, {userName}!</h1>
      </div>
      <section className="overview-section">
        <h2>Here are user's Overview:</h2>

        <p>Here you can find essential logistic information relevant to hospital operations.</p>
        <div className="overview-widgets">
          <div className="widget">
            <h3>Number of requisition you sent waited to be verified</h3>
           <label htmlFor="">{requestCount}</label> 
          </div>
          <div className="widget">
            <h3>Number of Approved Requisition</h3>
            <label htmlFor=""> {approvedCount}</label>
          </div>
          <div className="widget">
            <h3>Number of rejected Requisition</h3>
            <label htmlFor="">{rejecteddCount}</label>
          </div>
        </div>
      </section>

      <section className="additional-section">
        <h2>Additional Information</h2>
        <p>Explore more functionalities and resources available in the Navigation bar on your dashboard.</p>
        <ul>
          <li>View All items available to request</li>
          <li>Check your requisition status</li>
          <li>Manage your account details</li>
        </ul>
      </section>
    </div>
  );
};

export default DashboardOverview;
