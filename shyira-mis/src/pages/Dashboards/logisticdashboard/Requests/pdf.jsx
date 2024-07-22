import React, { useState } from 'react';
import axios from 'axios';

const HistoricalStockRange = () => {
  const [itemName, setItemName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [historyData, setHistoryData] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stock-history-by-name-range/${itemName}/${startDate}/${endDate}`);
      setHistoryData(response.data);
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
  };

  return (
    <div>
      <h2>View Historical Stock Data</h2>
      <form onSubmit={(e) => { e.preventDefault(); fetchHistory(); }}>
        <div>
          <label>Item Name:</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Get History</button>
      </form>
      {historyData.length > 0 && (
        <div>
          <h3>Historical Data for {itemName} from {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Quantity</th>
                <th>Price per Unit</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((entry, index) => (
                <tr key={index}>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  <td>{entry.quantity}</td>
                  <td>{entry.pricePerUnit}</td>
                  <td>{entry.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoricalStockRange;
