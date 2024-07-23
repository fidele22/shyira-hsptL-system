import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './itemreport.css'

const StockHistoryTable = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [stockHistory, setStockHistory] = useState([]);

  const fetchStockHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stocks/history/${year}/${month}`);
      setStockHistory(response.data);
    } catch (error) {
      console.error('Error fetching stock history:', error);
    }
  };

  useEffect(() => {
    fetchStockHistory();
  }, [year, month]);

  const handleYearChange = (e) => setYear(e.target.value);
  const handleMonthChange = (e) => setMonth(e.target.value);

  //handle calculation of tota amount
  const calculateTotals = () => {
    return stockHistory.reduce(
      (totals, stock) => {
        totals.entryTotalAmount += stock.entry.totalAmount;
        totals.exitTotalAmount += stock.exit.totalAmount;
        totals.balanceTotalAmount += stock.balance.totalAmount;
        return totals;
      },
      {
        entryTotalAmount: 0,
        exitTotalAmount: 0,
        balanceTotalAmount: 0,
      }
    );
  };

  const totals = calculateTotals();

  return (
    <div className="stock-history-container">
      <h2>Stock History Table</h2>
      <div className="stock-history-header">
        <label>
          Year:
          <input type="number" value={year} onChange={handleYearChange} />
        </label>
        <label>
          Month:
          <input type="number" value={month} onChange={handleMonthChange} min="1" max="12" />
        </label>
        <button onClick={fetchStockHistory}>Fetch</button>
      </div>
      <table className="stock-history-table">
        <thead>
        <tr>
                    <th rowSpan={2}>Item Name</th>
                    <th colSpan="3">ENTRY</th>
                    <th colSpan="3">EXIT</th>
                    <th colSpan="3">BALANCE</th>
                    <th>Actions</th>
                  </tr>
          <tr>
          
            <th>Quantity</th>
            <th>Price Per Unit</th>
            <th>Total Amount</th>
            <th>Quantity</th>
            <th>Price Per Unit</th>
            <th>Total Amount</th>
            <th>Quantity</th>
            <th>Price Per Unit</th>
            <th>Total Amount</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {stockHistory.map(stock => (
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
              <td>{new Date(stock.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td ><strong>Total Amount</strong></td>
            <td>-</td>
            <td>-</td>
            <td>{totals.entryTotalAmount.toFixed(2)}</td>
            <td>-</td>
            <td>-</td>
            <td>{totals.exitTotalAmount.toFixed(2)}</td>
            <td>-</td>
            <td>-</td>
            <td>{totals.balanceTotalAmount.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default StockHistoryTable;
