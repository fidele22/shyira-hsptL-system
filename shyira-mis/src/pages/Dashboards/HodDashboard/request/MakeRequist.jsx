import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './makeRequist.css'; // Import CSS for styling

const LogisticRequestForm = () => {
  const [items, setItems] = useState([]);
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  const [itemOptions, setItemOptions] = useState([]);
  const [user, setUser] = useState(null);

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
      const response = await axios.post('http://localhost:5000/api/UserRequest/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Requisition submitted successfully!');
    } catch (error) {
      console.error('Error submitting requisition:', error);
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
    if (key === 'itemName') {
      // Find the itemId based on the itemName
      const selectedItem = itemOptions.find((option) => option.name === value);
      updatedItems[index].itemId = selectedItem ? selectedItem._id : '';
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
            <div className="done-date">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <h2>REQUISITION FORM</h2>
          <button type="button" onClick={handleAddItem}>Add Item</button>
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
                    <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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

         

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default LogisticRequestForm;
