import React, { useState, useEffect } from 'react';
import './css/service.css'
import axios from 'axios';

const ViewPosition = () => {
  
    

  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/positions');
        setPositions(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchPositions();
  }, []);

  

  return (
    <div className="service-data">
         <h1>Positions List</h1>
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
            {positions.map((position, index) => (
              <tr key={position._id}>
                <td>{index+1}</td>
                <td>{position.name}</td>
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

export default ViewPosition;