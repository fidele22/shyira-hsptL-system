import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewRequest.css'; // Import CSS for styling

const ForwardedRequests = () => {
  const [forwardedRequests, setForwardedRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchForwardedRequests();
  }, []);

  const fetchForwardedRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/forwardedrequests');
      setForwardedRequests(response.data);
    } catch (error) {
      console.error('Error fetching forwarded requests:', error);
    }
  };

  const handleRequestClick = (requestId) => {
    const request = forwardedRequests.find(req => req._id === requestId);
    setSelectedRequest(request);
    setFormData(request);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(selectedRequest);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: value,
    };
    setFormData(prevState => ({
      ...prevState,
      items: updatedItems,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/forwardedrequests/${selectedRequest._id}`, formData);
      setSelectedRequest(response.data);
      setIsEditing(false);
      setForwardedRequests(prevRequests =>
        prevRequests.map(req => (req._id === response.data._id ? response.data : req))
      );

      // Forward the updated request to the approved collection
      await axios.post(`http://localhost:5000/api/forwardedrequests/${selectedRequest._id}/approve`);
      alert('submit requestion form successfully')
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  //const handleApproveClick = async () => {
  //  try {
  //    const response = await axios.post(`http://localhost:5000/api/forwardedrequests/${selectedRequest._id}/approve`);
  //    console.log('Approved request:', response.data);
  //  } catch (error) {
  //    console.error('Error forwarding request:', error);
  //  }
  //};

  return (
    <div className={`requist ${selectedRequest ? 'dim-background' : ''}`}>
      <h2>Forwarded Requests</h2>
      <div className="navigatio">
        <ul>
          {forwardedRequests.slice().reverse().map((request, index) => (
            <li key={index}>
              <button onClick={() => handleRequestClick(request._id)}>Request {forwardedRequests.length - index}</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedRequest && (
        <div className="request-details-overlay">
          <div className="request-details">
            {isEditing ? (
              <form onSubmit={handleUpdateSubmit}>
                <h1>Edit Request</h1>
                <label>District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                />
                <label>Health Facility</label>
                <input
                  type="text"
                  name="healthFacility"
                  value={formData.healthFacility}
                  onChange={handleInputChange}
                />
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                />
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
                    {formData.items.map((item, idx) => (
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
                <label>Signature</label>
                <input
                  type="text"
                  name="signature"
                  value={formData.signature}
                  onChange={handleInputChange}
                />
                <label>HOD Signature</label>
                <input
                  type="text"
                  name="hodSignature"
                  value={formData.hodSignature}
                  onChange={handleInputChange}
                />
                <label>Logistic Signature</label>
                <input
                  type="text"
                  name="logisticSignature"
                  value={formData.logisticSignature}
                  onChange={handleInputChange}
                />
                <label>Acknowledgement Receipt Signature</label>
                <input
                  type="text"
                  name="ackReceiptSignature"
                  value={formData.ackReceiptSignature}
                  onChange={handleInputChange}
                />
                <label>DAF Signature</label>
                <input
                  type="text"
                  name="dafSignature"
                  value={formData.dafSignature}
                  onChange={handleInputChange}
                />
                <button type="submit" className='submit-an-update' >Update Request</button>
                <button type="button" className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
              </form>
            ) : (
              <>
              <h3>WESTERN PROVINCE</h3>
            <h3>DISTRIC: <span>{selectedRequest.district}</span>  </h3>
            <h3>HEALTH FACILITY: <span>{selectedRequest.healthFacility}</span> </h3>
            <h3>DEPARTMENT: <span>{selectedRequest.department}</span> </h3>

            <h2>REQUISITON FORM</h2>
              
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
                <button className='edit-btn' onClick={handleEditClick}>Edit Form</button>
                <button className='cancel-btn'  onClick={() => setSelectedRequest(null)}>Cancel</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ForwardedRequests;
