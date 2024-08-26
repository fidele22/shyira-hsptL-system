import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaQuestionCircle, FaEdit,FaTimes, FaTimesCircle, FaCheck,
  FaCheckCircle, FaCheckDouble, FaCheckSquare } from 'react-icons/fa';
import SearchableDropdown from '../../logisticdashboard/Requests/searchable'
import './makeRequist.css'; // Import CSS for styling

const LogisticRequestForm = () => {
  const [items, setItems] = useState([]);
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  const [itemOptions, setItemOptions] = useState([]);
  const [user, setUser] = useState(null);


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
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('department', department);
    formData.append('items', JSON.stringify(items));
    formData.append('date', date);
    formData.append('hodName', user ? `${user.firstName} ${user.lastName}` : ''); // HOD Name
    formData.append('hodSignature', user && user.signature ? user.signature : ''); // HOD Signature URL
   

    try {
      const response = await axios.post('http://localhost:5000/api/UserRequest/submit', {
        department,
        items: JSON.stringify(items),
        date,
        hodName: user ? `${user.firstName} ${user.lastName}` : '',
        hodSignature: user && user.signature ? user.signature : ''
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json' // Ensure content type is JSON
        },
      });
  
      console.log(response.data);

      setModalMessage('Submit requisition to logistic successfully');
      setIsSuccess(true); // Set the success state
      setShowModal(true); // Show the modal
      // Refresh the list after posting
    } catch (error) {
      console.error('Error submitting requisition:', error);
      
      setModalMessage('Failed to submit requisition');
      setIsSuccess(false); // Set the success state
      setShowModal(true); // Show the modal
   // Refresh the list after posting
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
  
  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="requistion">
      <h2>Make Requisition</h2>
      <label htmlFor="">You have to make various requisitions for staff and accommodation</label>
      <div className="hod-request-form">
        <form onSubmit={handleSubmit}>
          <div className="image-logo">
            <img src="/image/logo.png" alt="Logo" className="logo" />
          </div>

          <div className="heading-title">
            <div className="title">
              <h3>WESTERN PROVINCE</h3>
            </div>
            <div className="title">
              <h3>DISTRICT: NYABIHU</h3>
            </div>
            <div className="title">
              <h3>HEALTH FACILITY : SHYIRA DISTRICT HOSPITAL</h3>
            </div>
            <div className="title">
              <h3>DEPARTMENT :</h3>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Type here .........."
                required
              />
            </div>
            {/** <div className="done-date">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>*/}
            
          </div>

          <h2>REQUISITION FORM</h2>
          <button className='additem-btn' type="button" onClick={handleAddItem}>Add Item</button>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Item Name</th>
                <th>Quantity Requested</th>
                <th>Quantity Received</th>
                <th>Observation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className='itemname-td'>
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
                    <button className='remove-btn' type="button" onClick={() => handleRemoveItem(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

          <div>
            <label htmlFor="hodName">Name of HOD</label>
            {user ? (
              <>
                <h1>{user.firstName} {user.lastName}</h1>
                <label htmlFor="hodSignature">HOD Signature:</label>
                {user.signature ? (
                  <img src={`http://localhost:5000/${user.signature}`} alt="Signature" />
                ) : (
                  <p>No signature available</p>
                )}
              </>
            ) : (
              <p>Loading user profile...</p>
            )}
          </div>

         

          <button className='hod-submit-btn' type="submit">Send Request</button>
        </form>
      </div>
    </div>
  );
};

export default LogisticRequestForm;
