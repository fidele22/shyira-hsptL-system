import React, { useState } from 'react';
import './makeRequist.css'; // Import CSS for styling

const LogisticRequestForm = () => {
  const [requesterName, setRequesterName] = useState('');
  const [department, setDepartment] = useState('');
  const [itemNeeded, setItemNeeded] = useState('');
  const [quantity, setQuantity] = useState('');
  const [urgency, setUrgency] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission (e.g., send data to backend or display a confirmation message)
    console.log({
      requesterName,
      department,
      itemNeeded,
      quantity,
      urgency,
      additionalNotes
    });
    // Optionally, you can reset the form fields here
    // setRequesterName('');
    // setDepartment('');
    // setItemNeeded('');
    // setQuantity('');
    // setUrgency('');
    // setAdditionalNotes('');
  };

  return (
    <div className="requist">
       <h2>Make Request to fill the follow Form</h2>
    
    <div className="logistic-request-form">
     
      <h2>Make Requist</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="requesterName">Requester's Name:</label>
          <input
            type="text"
            id="requesterName"
            value={requesterName}
            onChange={(e) => setRequesterName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemNeeded">Item/Service Needed:</label>
          <input
            type="text"
            id="itemNeeded"
            value={itemNeeded}
            onChange={(e) => setItemNeeded(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="urgency">Urgency:</label>
          <select
            id="urgency"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            required
          >
            <option value="">Select urgency</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="additionalNotes">Additional Notes:</label>
          <textarea
            id="additionalNotes"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            rows="4"
          />
        </div>
        <button type="submit">Submit Request</button>
      </form>
    </div>
    </div>
  );
};

export default LogisticRequestForm;
