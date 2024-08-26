import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaQuestionCircle, FaEdit,FaTimes, FaTimesCircle, FaCheck,
  FaCheckCircle, FaCheckDouble, FaCheckSquare } from 'react-icons/fa';
  
import SearchableDropdown from './searchable'; // Import the custom dropdown component
import './makeRequist.css'; // Import CSS for styling

const LogisticRequestForm = () => {
  const [items, setItems] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);
  const [date, setDate] = useState('');
  const [supplierName, setSupplierName] = useState('');



  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(''); //
  const [isSuccess, setIsSuccess] = useState(true);



  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stocks');
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
     
      setModalMessage('Requisition submitted successfully!');
      setIsSuccess(true); // Set the success state
      setShowModal(true); // Show the modal
    } catch (error) {
     
      setModalMessage('Failed submitting requisition');
      setIsSuccess(false); // Set the error state
      setShowModal(true); // Show the modal
    }
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        itemId: '',
        itemName: '',
        quantityRequested: '',
        price: '', 
        totalAmount: '',
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
    
    if (key === 'itemName') {
      // Find the selected item from the options
      const selectedItem = itemOptions.find(item => item.name === value);
      
      if (selectedItem) {
        updatedItems[index]['itemName'] = selectedItem.name;
        updatedItems[index]['itemId'] = selectedItem._id; // Store the itemId
      }
    } else {
      updatedItems[index][key] = value;
    }
  
    if (key === 'quantityRequested' || key === 'price') {
      const quantityRequested = updatedItems[index].quantityRequested || 0;
      const price = updatedItems[index].price || 0;
      updatedItems[index].totalAmount = quantityRequested * price;
    }
  
    setItems(updatedItems);
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
            <h2>REQUISITION FORM FORM LOGISTIC DEPARTMENT</h2>
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
                    <SearchableDropdown
                      options={itemOptions}
                      selectedValue={item.itemName}
                      onSelect={(value) => handleItemChange(index, 'itemName', value)}
                    />
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
          <button className='Log-submit-btn' type="submit">Submit Request</button>
        </form>
      </div>
        {/* Modal pop message on success or error message */}
     {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {isSuccess ? (
              <div className="modal-success">
                <FaCheckCircle size={54} color="green" />
                <p>{modalMessage}</p>
              </div>
            ) : (
              <div className="modal-error">
                <FaTimesCircle size={54} color="red" />
                <p>{modalMessage}</p>
              </div>
            )}
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogisticRequestForm;

