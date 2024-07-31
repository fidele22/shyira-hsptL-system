import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import './viewitems.css';
import AddItemForm from '../addItem/addingitem';

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Number of items per page

  const [stockHistory, setStockHistory] = useState(null);
  const [stockDetails, setStockDetails] = useState(null);
  const [editedStock, setEditedStock] = useState(null);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
 

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleEditClick = (item) => {
    setItemToEdit(item);
  };

  const handleDeleteClick = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${itemId}`);
      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleUpdateItem = (updatedItem) => {
    setItems(items.map((item) => (item._id === updatedItem._id ? updatedItem : item)));
    setItemToEdit(null);
  };

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleUpdateStock = async () => {
    try {
      await axios.put(`http://localhost:5000/api/stocks/${editedStock._id}`, editedStock);
      setStockDetails(stockDetails.map((entry) => (entry._id === editedStock._id ? editedStock : entry)));
     alert('stock updated successful')
      setEditedStock({
        entry: { quantity: 0, pricePerUnit: 0, totalAmount: 0 },
        exit: { quantity: 0, pricePerUnit: 0, totalAmount: 0 },
      });
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock');
    }
  };

  const handleCancelEdit = () => {
    setItemToEdit(null);
  };

  const handleDetailsClick = async (itemId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stocks/${itemId}`);
      setStockDetails(response.data);
    } catch (error) {
      console.error('Error fetching stock details:', error);
      alert('Fetching stock details failed');
    }
  };

  const handleEditStock = (stock) => {
    setEditedStock({ ...stock });
  };

  const handleHistoryClick = async (itemId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stocks/history/${itemId}`, {
        params: { startDate, endDate }
      });
      setStockHistory(response.data);
    } catch (error) {
      console.error('Error fetching stock history:', error);
      alert('Fetching stock history failed');
    }
  };

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const handleInputChange = (e, section, field) => {
    const { value } = e.target;
    setEditedStock((prevStock) => ({
      ...prevStock,
      [section]: {
        ...prevStock[section],
        [field]: value,
      },
    }));
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const downloadPDF = async () => {
    const input = document.getElementById('history-content');
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
  const downloadExcel = () => {
    // Target the content within the history-content div by its ID
    const table = document.getElementById("history-content").getElementsByTagName("table")[0];
    
    // Create a new workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(table);
    
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Stock History");
    
    // Generate Excel file and trigger download
    XLSX.writeFile(wb, `Stock_History_${stockDetails[0]?.itemId?.name}_${startDate}_to_${endDate}.xlsx`);
  };

  return (
    <div className="view-items">
      <h2>Items List Management</h2>
      <div className='items-table'>
     
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
     
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Maximum Quantity</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item._id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.maximum}</td>
                <td>{item.description}</td>
                <td>
                  <button className="item-edit-btn" onClick={() => handleEditClick(item)}>Edit</button>
                  <button className="details-btn" onClick={() => handleDetailsClick(item._id)}>Stock</button>
                  <button className="delete-btn" onClick={() => handleDeleteClick(item._id)}>Delete</button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number}>
              <button onClick={() => paginate(number)}>{number}</button>
            </li>
          ))}
        </ul>

        {/* Add item form if editing */}
        {itemToEdit && (
          <div className="editing-item-overlay">
            <div className="edit-item">
              <AddItemForm
                itemToEdit={itemToEdit}
                onUpdateItem={handleUpdateItem}
                onAddItem={handleAddItem}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </div>
        )}
        {/* Display stock details */}
        {stockDetails && (
          <div className="stockDetails-overlay">
            <div className="stock-details">
            <div className="history-filter">
                <label>
                  Start Date:
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                </label>
                <label>
                  End Date:
                  <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </label>
                <button onClick={() => handleHistoryClick(stockDetails[0]?.itemId?._id)}
                  className='view-history-btn'>View History</button>
              </div>
              <div className="stock-titles">
              <h1>Item Stock</h1>
              <h2>Current Stock of <span>{stockDetails[0]?.itemId?.name}</span> </h2>
              <h3>Stock Details</h3>
              </div>
              
             
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th colSpan="3">ENTRY</th>
                    <th colSpan="3">EXIT</th>
                    <th colSpan="3">BALANCE</th>
                    <th>Actions</th>
                  </tr>
                  <tr>
                    <th>updated on</th>
                    <th>Quantity</th>
                    <th>Price per Unit</th>
                    <th>Total Amount</th>
                    <th>Quantity</th>
                    <th>Price per Unit</th>
                    <th>Total Amount</th>
                    <th>Quantity</th>
                    <th>Price per Unit</th>
                    <th>Total Amount</th>
                    <th>Edit/Update</th>
                  </tr>
                </thead>
                <tbody>
                  {stockDetails.map((entry, index) => (
                    <tr key={index}>
                       <td>{new Date(entry.updatedAt).toLocaleString()}</td> {/* Display updated date */}
                      {/* Entry */}
                      <td>
                        {editedStock && editedStock._id === entry._id ? (
                          <input
                            type="number"
                            name="quantity"
                            value={editedStock.entry.quantity}
                            onChange={(e) => handleInputChange(e, 'entry', 'quantity')}
                          />
                        ) : (
                          entry.entry.quantity
                        )}
                      </td>
                      <td>
                        {editedStock && editedStock._id === entry._id ? (
                          <input
                            type="number"
                            name="pricePerUnit"
                            value={editedStock.entry.pricePerUnit}
                            onChange={(e) => handleInputChange(e, 'entry', 'pricePerUnit')}
                          />
                        ) : (
                          entry.entry.pricePerUnit
                        )}
                      </td>
                      <td>
                        {editedStock && editedStock._id === entry._id ? (
                          <input
                            type="number"
                            name="totalAmount"
                            value={editedStock.entry.totalAmount}
                            onChange={(e) => handleInputChange(e, 'entry', 'totalAmount')}
                          />
                        ) : (
                          entry.entry.totalAmount
                        )}
                      </td>

                      {/* Exit */}
                      <td>
                        {editedStock && editedStock._id === entry._id ? (
                          <input
                            type="number"
                            name="quantity"
                            value={editedStock.exit.quantity}
                            onChange={(e) => handleInputChange(e, 'exit', 'quantity')}
                          />
                        ) : (
                          entry.exit.quantity
                        )}
                      </td>
                      <td>
                        {editedStock && editedStock._id === entry._id ? (
                          <input
                            type="number"
                            name="pricePerUnit"
                            value={editedStock.exit.pricePerUnit}
                            onChange={(e) => handleInputChange(e, 'exit', 'pricePerUnit')}
                          />
                        ) : (
                          entry.exit.pricePerUnit
                        )}
                      </td>
                      <td>
                        {editedStock && editedStock._id === entry._id ? (
                          <input
                            type="number"
                            name="totalAmount"
                            value={editedStock.exit.totalAmount}
                            onChange={(e) => handleInputChange(e, 'exit', 'totalAmount')}
                          />
                        ) : (
                          entry.exit.totalAmount
                        )}
                      </td>

                      {/* Balance */}
                      <td>{entry.balance.quantity}</td>
                      <td>{entry.balance.pricePerUnit}</td>
                      <td>{entry.balance.totalAmount}</td>

                      <td>
                        {editedStock && editedStock._id === entry._id ? (
                          <>
                            <button className='detail-update-btn' onClick={handleUpdateStock}>Update</button>
                            <button className='detail-cancel-btn' onClick={() => setEditedStock(null)}>Cancel</button>
                          </>
                        ) : (
                          <button className='detail-edit-btn' onClick={() => handleEditStock(entry)}>Edit</button>
                        
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="detail-close-btn" onClick={() => setStockDetails(null)}>Close</button>
            </div>
          </div>
        )}
        {/* front end of stock history , to look fiche de stock*/}
        {stockHistory && (
          <div className="stockHistory-overlay">
            <div className="stock-history" >

              <div id='history-content'>

           
              <h2>Fiche De Stock</h2>
              <h3>Article de stock <span>{stockDetails[0]?.itemId?.name}</span> </h3>
              <h4>Code:</h4>
              <h4>Stock History from {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}</h4>
            
              <table>
                <thead>
                  <tr>
                    <th colSpan="10">Quantity Maximum : {stockDetails[0]?.itemId?.maximum}</th>
                  </tr>
                  <tr>
                  <th colSpan="10">Stock d'alerte: {stockDetails[0]?.itemId?.minimum}</th>
                  </tr>
                <tr>
                    <th>Date</th>
                    <th colSpan="3">ENTRY</th>
                    <th colSpan="3">EXIT</th>
                    <th colSpan="3">BALANCE</th>
                  
                  </tr>
                  <tr>
                    <th>updated on</th>
                    <th>Quantity</th>
                    <th>Price per Unit</th>
                    <th>Total Amount</th>
                    <th>Quantity</th>
                    <th>Price per Unit</th>
                    <th>Total Amount</th>
                    <th>Quantity</th>
                    <th>Price per Unit</th>
                    <th>Total Amount</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {stockHistory.map((history, index) => (
                    <tr key={index}>
                      <td>{new Date(history.updatedAt).toLocaleString()}</td>
                      <td>{history.entry.quantity}</td>
                      <td>{history.entry.pricePerUnit}</td>
                      <td>{history.entry.totalAmount}</td>
                      <td>{history.exit.quantity}</td>
                      <td>{history.exit.pricePerUnit}</td>
                      <td>{history.exit.totalAmount}</td>
                      <td>{history.balance.quantity}</td>
                      <td>{history.balance.pricePerUnit}</td>
                      <td>{history.balance.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <div className="history-btn">
              <button className='detail-close-btn' onClick={() => setStockHistory(null)} >Close</button>
              <button className='download-history-btn' onClick={downloadPDF}>Download Pdf</button>
              <button className="download-exl-btn" onClick={downloadExcel} >Export Excel</button>
              </div>
              
            </div>
          </div>
        )}
         
      </div>
      <div className="items-list-stock">
      <h2>List of items you have in stock</h2>
      
      {currentItems.map((item, index) => (
        <ul  key={item._id}>

                <li>{item.name}</li>
        </ul> 
            ))}
    
      </div>
      
    </div>
  );
};

export default ViewItems;
