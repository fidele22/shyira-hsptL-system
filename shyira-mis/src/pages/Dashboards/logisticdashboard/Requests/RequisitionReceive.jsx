import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './makeRequist.css'; // Import CSS for styling

const LogisticRequestForm = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    district: '',
    healthFacility: '',
    department: '',
    items: [],
    signature: '',
    hodSignature: '',
    logisticSignature: '',
    ackReceiptSignature: '',
    dafSignature: ''
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/logisticrequests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleRequestClick = async (requestId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/logisticrequests/${requestId}`);
      setSelectedRequest(response.data);
      setEditFormData(response.data); // Populate edit form data with selected request
      setIsEditing(false); // Ensure we start in view mode
    } catch (error) {
      console.error('Error fetching request details:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = editFormData.items.map((item, idx) => 
      idx === index ? { ...item, [name]: value } : item
    );
    setEditFormData({
      ...editFormData,
      items: updatedItems
    });
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/logisticrequests/${selectedRequest._id}`, editFormData);
      alert('Request updated successfully!');
      fetchRequests(); // Refresh the list of requests
      setSelectedRequest(null); // Close the details view
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  return (
    <div className={`requist ${selectedRequest ? 'dim-background' : ''}`}>
      <h2>Logistic Requests</h2>
      <div className="navigate">
        <ul>
          {requests.slice().reverse().map((request, index) => (
            <li key={index}>
              <button onClick={() => handleRequestClick(request._id)}>Request {requests.length - index}</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedRequest && (
        <div className="request-details-overlay">
          <div className="request-details">
            <h3>{editFormData.district} - {editFormData.healthFacility} - {editFormData.department}</h3>
            {isEditing ? (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Item Name</th>
                      <th>Quantity Requested</th>
                      <th>Quantity Received</th>
                      <th>Observation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editFormData.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          <input 
                            type="text" 
                            name="itemName" 
                            value={item.itemName} 
                            onChange={(e) => handleItemChange(idx, e)} 
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            name="quantityRequested" 
                            value={item.quantityRequested} 
                            onChange={(e) => handleItemChange(idx, e)} 
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            name="quantityReceived" 
                            value={item.quantityReceived} 
                            onChange={(e) => handleItemChange(idx, e)} 
                          />
                        </td>
                        <td>
                          <input 
                            type="text" 
                            name="observation" 
                            value={item.observation} 
                            onChange={(e) => handleItemChange(idx, e)} 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="signature-section">
                  <div className="signature">
                    <label>Signature and Name: </label>
                    <input 
                      type="text" 
                      name="signature" 
                      value={editFormData.signature} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="signature">
                    <label>HOD Signature: </label>
                    <input 
                      type="text" 
                      name="hodSignature" 
                      value={editFormData.hodSignature} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="signature">
                    <label>Logistic Signature: </label>
                    <input 
                      type="text" 
                      name="logisticSignature" 
                      value={editFormData.logisticSignature} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="signature">
                    <label>Acknowledgement Receipt Signature: </label>
                    <input 
                      type="text" 
                      name="ackReceiptSignature" 
                      value={editFormData.ackReceiptSignature} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="signature">
                    <label>DAF Signature: </label>
                    <input 
                      type="text" 
                      name="dafSignature" 
                      value={editFormData.dafSignature} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                <hr />
                <button onClick={handleUpdateSubmit}>Submit</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Item Name</th>
                      <th>Quantity Requested</th>
                      <th>Quantity Received</th>
                      <th>Observation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRequest.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item.itemName}</td>
                        <td>{item.quantityRequested}</td>
                        <td>{item.quantityReceived}</td>
                        <td>{item.observation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="signature-section">
                  <div className="signature">
                    <p>Signature and Name: {selectedRequest.signature}</p>
                  </div>
                  <div className="signature">
                    <p>HOD Signature: {selectedRequest.hodSignature}</p>
                  </div>
                  <div className="signature">
                    <p>Logistic Signature: {selectedRequest.logisticSignature}</p>
                  </div>
                  <div className="signature">
                    <p>Acknowledgement Receipt Signature: {selectedRequest.ackReceiptSignature}</p>
                  </div>
                  <div className="signature">
                    <p>DAF Signature: {selectedRequest.dafSignature}</p>
                  </div>
                </div>
                <hr />
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={() => setSelectedRequest(null)}>Cancel</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LogisticRequestForm;
