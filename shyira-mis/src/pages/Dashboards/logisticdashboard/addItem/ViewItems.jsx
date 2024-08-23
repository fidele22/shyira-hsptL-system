import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Item list</h2>
      <h3> Here are Items in stored in stock with its updated balance</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price per Unit</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.pricePerUnit}</td>
              <td>{item.totalAmount}</td>
              <td>
                <button className='stock-details-btn' onClick={() => onItemSelect(item)}>View Stock Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplay;
