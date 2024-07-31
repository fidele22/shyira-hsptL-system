import React, { useState,useEffect } from 'react';
import axios from 'axios';
 // Import CSS for styling

const LogisticRequestForm = () => {
  const [items, setItems] = useState([]);
  const [district, setDistrict] = useState('');
  const [healthFacility, setHealthFacility] = useState('');
  const [department, setDepartment] = useState('');
  const [itemOptions, setItemOptions] = useState([]);// used to fetch item name from item table
  const [signature, setSignature] = useState('');
  const [date, setDate] = useState('');
  const [hodSignature, setHodSignature] = useState(null);
  const [logisticSignature, setLogisticSignature] = useState(null);
  const [ackReceiptSignature, setAckReceiptSignature] = useState(null);
  const [dafSignature, setDafSignature] = useState(null);

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
    formData.append('district', district);
    formData.append('healthFacility', healthFacility);
    formData.append('department', department);
    formData.append('items', JSON.stringify(items));
    formData.append('signature', signature);
    formData.append('date', date);
    formData.append('hodSignature', hodSignature);
    formData.append('logisticSignature', logisticSignature);
    formData.append('ackReceiptSignature', ackReceiptSignature);
    formData.append('dafSignature', dafSignature);

    try {
      const response = await axios.post('http://localhost:5000/api/logisticrequests/submit', formData, {
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
        quantityReceived: '',
        observation: '',
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
          <img src="/image/logo2.png" alt="Logo" className="log"  />
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
          <p>Supplier Name:   <input type="text" placeholder="Type names here......" /></p>
          </div>
         
          <button type="button" onClick={handleAddItem}>Add Item</button>
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
                      value={item.quantityReceived}
                      onChange={(e) => handleItemChange(index, 'quantityReceived', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.observation}
                      onChange={(e) => handleItemChange(index, 'observation', e.target.value)}
                    />
                  </td>
                  <td>
                    <button type="button" className='remove-btn' onClick={() => handleRemoveItem(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="signature-section">
            
            <div className="logistic-sign">
              <label htmlFor="logisticSignature">Logistic:</label>
              
              <br />
              Names:
              <input type="text" placeholder="Type names here......" /> <br />
              Upload Signature Image:
              <input
                type="file"
                id="logisticSignature"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setLogisticSignature)}
              />
            </div>
          </div>

          <hr />
          <h4>SHYIRA DISTRICT HOSPITAL , WESTERN PROVINCE , NYABIHU DISTRICT</h4>
          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default LogisticRequestForm;
