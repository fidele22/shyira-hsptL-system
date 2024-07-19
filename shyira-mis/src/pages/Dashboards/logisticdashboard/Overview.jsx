import React, { useEffect, useState } from 'react';
import logo from '../../../Component/image/land.jpg'
import './contentCss/overview.css';

const DashboardOverview = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Debug log

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

        console.log('Response status:', response.status); // Debug log

        if (response.ok) {
          const data = await response.json();
          console.log('User data:', data); // Debug log
          const fullName = `${data.lastName}`;
          setUserName(fullName);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard-content">
      <h1>Welcome back, {userName}!</h1>

      {/* Overview Sections */}
      <section className="overview-section">
        <h2>Logistic Overview</h2>
        <img src={logo} alt="" style={{ width: '1500px', height: '100px' }} />
        <p>Here you can find essential logistic information relevant to hospital operations.</p>
        {/* Add relevant widgets and summaries here */}
        <div className="overview-widgets">
          <div className="widget">
            <h3>Current Requests</h3>
            <p>View and manage current logistic requests from hospital departments.</p>
            {/* Example: Display a list of recent logistic requests */}
            <ul>
              <li>Request 1</li>
              <li>Request 2</li>
              <li>Request 3</li>
            </ul>
          </div>
          <div className="widget">
            <h3>Inventory Status</h3>
            <p>Check the current status of hospital inventory and supplies.</p>
            {/* Example: Display inventory status charts or summaries */}
          </div>
          <div className="widget">
            <h3>Upcoming Deliveries</h3>
            <p>Track scheduled deliveries and logistics updates.</p>
            {/* Example: Display upcoming delivery schedules */}
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="additional-section">
        <h2>Additional Information</h2>
        <p>Explore more functionalities and resources available in the logistic dashboard.</p>
        {/* Add more informative sections or links */}
        <ul>
          <li>View All Requests</li>
          <li>Inventory Management</li>
          <li>Reports and Analytics</li>
        </ul>
      </section>
    </div>
  );
};

export default DashboardOverview;
