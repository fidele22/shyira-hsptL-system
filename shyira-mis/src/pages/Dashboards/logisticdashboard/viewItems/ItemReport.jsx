import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import './itemreport.css';

const StockHistoryTable = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [currentStock, setCurrentStock] = useState([]);
  const [previousStock, setPreviousStock] = useState([]);
  const [stockHistory, setStockHistory] = useState([]);
  const [aggregatedStock, setAggregatedStock] = useState([]);
  const [totals, setTotals] = useState({
    openingQuantity: 0,
    openingTotalAmount: 0,
    entryQuantity: 0,
    entryTotalAmount: 0,
    exitQuantity: 0,
    exitTotalAmount: 0,
    balanceQuantity: 0,
    balanceTotalAmount: 0,
  });


  const fetchStockData = async () => {
    try {
      // Fetch current month's stock history
      const currentResponse = await axios.get(`http://localhost:5000/api/stocks/history/${year}/${month}`);
      setCurrentStock(currentResponse.data);
      
      // Fetch previous month's stock history
      const previousMonth = month === 1 ? 12 : month - 1;
      const previousYear = month === 1 ? year - 1 : year;
      const previousResponse = await axios.get(`http://localhost:5000/api/stocks/history/${previousYear}/${previousMonth}`);
      setPreviousStock(previousResponse.data);

      aggregateStockData(currentResponse.data, previousResponse.data);
    } catch (error) {
      console.error('Error fetching stock history:', error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, [year, month]);

  const handleYearChange = (e) => setYear(e.target.value);
  const handleMonthChange = (e) => setMonth(e.target.value);

  const aggregateStockData = (currentData, previousData) => {
    const aggregatedData = {};

    // Aggregate current month data
    currentData.forEach(stock => {
      const itemId = stock.itemId._id;
      if (!aggregatedData[itemId]) {
        aggregatedData[itemId] = {
          itemName: stock.itemId.name,
          openingQuantity: 0,
          openingTotalAmount: 0,
          openingPricePerUnit: 0,
          entryQuantity: 0,
          entryTotalAmount: 0,
          lastEntryPricePerUnit: 0,
          exitQuantity: 0,
          exitTotalAmount: 0,
          balanceQuantity: 0,
          balanceTotalAmount: 0,
        };
      }

      if (stock.entry) {
        aggregatedData[itemId].entryQuantity += stock.entry.quantity || 0;
        aggregatedData[itemId].entryTotalAmount += stock.entry.totalAmount || 0;
        aggregatedData[itemId].lastEntryPricePerUnit = stock.entry.pricePerUnit || 0;
      }
      if (stock.exit) {
        aggregatedData[itemId].exitQuantity += stock.exit.quantity || 0;
        aggregatedData[itemId].exitTotalAmount += stock.exit.totalAmount || 0;
      }
      if (stock.balance) {
        aggregatedData[itemId].balanceQuantity = stock.balance.quantity || 0;
        aggregatedData[itemId].balanceTotalAmount = stock.balance.totalAmount || 0;
      }
    });

    // Set opening stock data from previous month
    previousData.forEach(stock => {
      const itemId = stock.itemId._id;
      if (aggregatedData[itemId]) {
        if (stock.balance) {
          aggregatedData[itemId].openingQuantity = stock.balance.quantity || 0;
          aggregatedData[itemId].openingTotalAmount = stock.balance.totalAmount || 0;
          aggregatedData[itemId].openingPricePerUnit = stock.balance.pricePerUnit || 0;
        }
      }
    });

    setAggregatedStock(Object.values(aggregatedData));
  
  // Handle calculation of total amount
  // Calculate totals
  const totalValues = Object.values(aggregatedData).reduce((acc, stock) => {
    acc.openingQuantity += stock.openingQuantity || 0;
    acc.openingTotalAmount += stock.openingTotalAmount || 0;
    acc.entryQuantity += stock.entryQuantity || 0;
    acc.entryTotalAmount += stock.entryTotalAmount || 0;
    acc.exitQuantity += stock.exitQuantity || 0;
    acc.exitTotalAmount += stock.exitTotalAmount || 0;
    acc.balanceQuantity += stock.balanceQuantity || 0;
    acc.balanceTotalAmount += stock.balanceTotalAmount || 0;
    return acc;
  }, {
    openingQuantity: 0,
    openingTotalAmount: 0,
    entryQuantity: 0,
    entryTotalAmount: 0,
    exitQuantity: 0,
    exitTotalAmount: 0,
    balanceQuantity: 0,
    balanceTotalAmount: 0,
  });

  setTotals(totalValues);
};

//dowload file
const downloadPDF = async () => {
  const input = document.getElementById('report-content');
  if (!input) {
    console.error('Element with ID pdf-content not found');
    return;
  }

  try {
    const canvas = await html2canvas(input);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 15;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    pdf.addImage(data, 'PNG', 5, 5, imgWidth, imgHeight);
    pdf.save('Fiche de stock.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
  return (
    <div className="stock-history-container">
      <div  id='report-content'>
      <h2>Stock History Table</h2>
      <div className="stock-history-header" >
        <label>
          Year:
          <input type="number" value={year} onChange={handleYearChange} />
        </label>
        <label>
          Month:
          <input type="number" value={month} onChange={handleMonthChange} min="1" max="12" />
        </label>
        <button onClick={fetchStockData}>Fetch</button>
      </div>
      <table className="stock-history-table">
        <thead>
          <tr>
            <th rowSpan={2}>Item Name</th>
            <th colSpan="3">OPENING STOCK</th>
            <th colSpan="3">ENTRY</th>
            <th colSpan="3">EXIT</th>
            <th colSpan="3">BALANCE</th>
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
            <th>Quantity</th>
            <th>Price Per Unit</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {aggregatedStock.map((stock, index) => (
            <tr key={index}>
              <td>{stock.itemName}</td>
              <td>{stock.openingQuantity}</td>
              <td>{stock.openingPricePerUnit}</td>
              <td>{stock.openingTotalAmount}</td>
              <td>{stock.entryQuantity}</td>
              <td>{stock.lastEntryPricePerUnit}</td>
              <td>{stock.entryTotalAmount}</td>
              <td>{stock.exitQuantity}</td>
              <td>{stock.lastEntryPricePerUnit}</td>
              <td>{stock.exitTotalAmount}</td>
              <td>{stock.balanceQuantity}</td>
              <td>{stock.lastEntryPricePerUnit}</td>
              <td>{stock.balanceTotalAmount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td><strong>Total Amount</strong></td>
            <td>-</td>
            <td>-</td>
            <td>{totals.openingTotalAmount.toFixed(2)}</td>
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
      <button className='download-history-btn' onClick={downloadPDF}>Download Report Pdf</button>
    </div>
  );
};

export default StockHistoryTable;
