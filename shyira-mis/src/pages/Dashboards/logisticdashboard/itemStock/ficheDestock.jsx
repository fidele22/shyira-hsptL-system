import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditStockForm = ({ itemId, onStockUpdated }) => {
  const [stockData, setStockData] = useState({
    entry: [{ date: '', quantity: '', pricePerUnit: '', totalAmount: '' }],
    exit: [{ date: '', quantity: '', pricePerUnit: '', totalAmount: '' }],
    balance: [{ date: '', quantity: '', pricePerUnit: '', totalAmount: '' }]
  });

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/stocks/${itemId}`);
        if (response.data) {
          setStockData(response.data);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    if (itemId) {
      fetchStockData();
    }
  }, [itemId]);

  const handleInputChange = (section, index, e) => {
    const { name, value } = e.target;
    const updatedSection = [...stockData[section]];
    updatedSection[index] = { ...updatedSection[index], [name]: value };
    setStockData({ ...stockData, [section]: updatedSection });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/stocks/${itemId}`, stockData);
      onStockUpdated(response.data);
      alert('Stock data updated successfully');
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock data');
    }
  };

  const addNewRow = (section) => {
    setStockData({ ...stockData, [section]: [...stockData[section], { date: '', quantity: '', pricePerUnit: '', totalAmount: '' }] });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Stock Data</h3>
      {['entry', 'exit', 'balance'].map((section) => (
        <div key={section}>
          <h4>{section.charAt(0).toUpperCase() + section.slice(1)}</h4>
          {stockData[section].map((item, index) => (
            <div key={index}>
              <label>Date:</label>
              <input type="date" name="date" value={item.date} onChange={(e) => handleInputChange(section, index, e)} />
              <label>Quantity:</label>
              <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleInputChange(section, index, e)} />
              <label>Price per Unit:</label>
              <input type="number" name="pricePerUnit" value={item.pricePerUnit} onChange={(e) => handleInputChange(section, index, e)} />
              <label>Total Amount:</label>
              <input type="number" name="totalAmount" value={item.totalAmount} onChange={(e) => handleInputChange(section, index, e)} />
            </div>
          ))}
          <button type="button" onClick={() => addNewRow(section)}>Add New {section.charAt(0).toUpperCase() + section.slice(1)}</button>
        </div>
      ))}
      <button type="submit">Update Stock</button>
    </form>
  );
};

export default EditStockForm;
