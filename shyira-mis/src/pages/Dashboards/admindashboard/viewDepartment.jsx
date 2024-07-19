import React, { useState, useEffect } from 'react';
import './css/service.css'
import axios from 'axios';

const ViewDepartment = () => {
  
    

  const [departments, setDepartments] = useState([]);


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchDepartments();
  }, []);

  

  return (
    <div className="service-data">
         <h1>Departments List</h1>
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
            {departments.map((department, index) => (
              <tr key={department._id}>
                <td>{index+1}</td>
                <td>{department.name}</td>
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

export default ViewDepartment;