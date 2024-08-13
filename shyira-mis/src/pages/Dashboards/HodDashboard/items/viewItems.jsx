import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './viewItems.css'

const DataDisplay = ({ onItemSelect }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stocks');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='hod-items'>
      <h2>Item list</h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity Available</th>
           
            
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
             
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplay;
