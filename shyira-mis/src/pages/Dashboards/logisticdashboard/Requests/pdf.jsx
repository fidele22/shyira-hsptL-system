import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockTable = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stocks');
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div>
      <h2>Stock Table</h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Entry Quantity</th>
            <th>Entry Price Per Unit</th>
            <th>Entry Total Amount</th>
            <th>Exit Quantity</th>
            <th>Exit Price Per Unit</th>
            <th>Exit Total Amount</th>
            <th>Balance Quantity</th>
            <th>Balance Price Per Unit</th>
            <th>Balance Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock._id}>
              <td>{stock.itemId.name}</td>
              <td>{stock.entry.quantity}</td>
              <td>{stock.entry.pricePerUnit}</td>
              <td>{stock.entry.totalAmount}</td>
              <td>{stock.exit.quantity}</td>
              <td>{stock.exit.pricePerUnit}</td>
              <td>{stock.exit.totalAmount}</td>
              <td>{stock.balance.quantity}</td>
              <td>{stock.balance.pricePerUnit}</td>
              <td>{stock.balance.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
