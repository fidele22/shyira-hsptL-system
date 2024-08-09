import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './makeRequist.css'; // Import CSS for styling

const LogisticRequestForm = () => {
  const [items, setItems] = useState([]);
  const [itemOptions, setItemOptions] = useState([]); // used to fetch item name from item table
  const [date, setDate] = useState('');
  const [supplierName, setSupplierName] = useState('');
  
  // fetching item names use to select when making request
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setItemOptions(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('items', JSON.stringify(items));
    formData.append('date', date);
    formData.append('supplierName', supplierName); 
   
    try {
      const response = await axios.post('http://localhost:5000/api/LogisticRequest/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Requisition submitted successfully!');
    } catch (error) {
      alert('Error submitting requisition');
    }
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        itemId: '',
        itemName: '',
        quantityRequested: '',
        price: '', // Add price field
        totalAmount: '', // Add total amount field
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleItemChange = (index, key, value) => {
    const updatedItems = [...items];
    updatedItems[index][key] = value;

    if (key === 'quantityRequested' || key === 'price') {
      const quantityRequested = updatedItems[index].quantityRequested || 0;
      const price = updatedItems[index].price || 0;
      updatedItems[index].totalAmount = quantityRequested * price;
    }

    setItems(updatedItems);
  };

  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="requistion">
      <h2>Make Requisition</h2>
      <div className="hod-request-form">
        <form onSubmit={handleSubmit}>
          <div className="imag-logo">
            <img src="/image/logo2.png" alt="Logo" className="log" />
          </div>
          <div className="heading-title">
            <div className="title">
              <h3>WESTERN PROVINCE</h3>
            </div>
            <div className="title">
              <h3>DISTRICT NYABIHU</h3>
            </div>
            <div className="title">
              <h3>SHYIRA DISTRICT HOSPITAL</h3>
            </div>
            <div className="title">
              <h3>LOGISTIC OFFICE</h3>
            </div>
            <div className="date-of-done">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="requisition-title">
            <h2>REQUISITION FORM</h2>
            <p>Supplier Name: <input type="text" placeholder="Type names here..." 
            value={supplierName} onChange={(e) => setSupplierName(e.target.value)} /></p>
          </div>
          <button type="button" className="Add-item-btn" onClick={handleAddItem}>Add Item</button>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Item Name</th>
                <th>Quantity Requested</th>
                <th>Price</th>
                <th>Total Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <select
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      required
                    >
                      <option value="">Select Item</option>
                      {itemOptions.map((option) => (
                        <option key={option._id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.quantityRequested}
                      onChange={(e) => handleItemChange(index, 'quantityRequested', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.totalAmount}
                      readOnly
                    />
                  </td>
                  <td>
                    <button type="button" className="remove-btn" onClick={() => handleRemoveItem(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="signature-section"></div>
          <hr />
          <h4>SHYIRA DISTRICT HOSPITAL, WESTERN PROVINCE, NYABIHU DISTRICT</h4>
          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default LogisticRequestForm;
