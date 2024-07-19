import React, { useState, useEffect } from 'react';
import './css/service.css'
import axios from 'axios';

const ViewService = () => {
  
    

  const [departments, setDepartments] = useState([]);
  const [services, setServices] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchServices();
  }, []);

  

  return (
    <div className="service-data">
         <h1>Services List</h1>
        <div className="service-table-data">
       
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Action</th>
             
              
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service._id}>
                <td>{index+1}</td>
                <td>{service.name}</td>
                <td>
                    <button>edit</button>
                    <button>delete</button>

                </td>
               
               
                
              </tr>
            ))}
          </tbody>
        </table>
        </div>
         
       
    </div>
  );
};

export default ViewService;