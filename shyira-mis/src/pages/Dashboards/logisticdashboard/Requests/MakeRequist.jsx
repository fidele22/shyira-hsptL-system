import React, { useState } from 'react';
import axios from 'axios';
 // Import CSS for styling

const LogisticRequestForm = () => {
  const [items, setItems] = useState([]);
  const [district, setDistrict] = useState('');
  const [healthFacility, setHealthFacility] = useState('');
  const [department, setDepartment] = useState('');
  const [signature, setSignature] = useState('');
  const [date, setDate] = useState('');
  const [hodSignature, setHodSignature] = useState(null);
  const [logisticSignature, setLogisticSignature] = useState(null);
  const [ackReceiptSignature, setAckReceiptSignature] = useState(null);
  const [dafSignature, setDafSignature] = useState(null);

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
       
    <h2>Requisition Form</h2>
      <div className="hod-request-form">
        <form onSubmit={handleSubmit}>
        <div className="imag-logo">
          <img src="/image/logo.png" alt="Logo" className="log"  />
          </div>
          <h3>WESTERN PROVINCE</h3>
          <div className="heading-title">
            <div className="title">
              <h3>DISTRICT</h3>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Type here .........."
                required
              />
            </div>
            <div className="title">
              <h3>HEALTH FACILITY</h3>
              <input
                type="text"
                value={healthFacility}
                onChange={(e) => setHealthFacility(e.target.value)}
                placeholder="Type here .........."
                required
              />
            </div>
            <div className="title">
              <h3>DEPARTMENT</h3>
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
                    <input
                      type="text"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      required
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
                    <button type="button" className='remove-btn' onClick={() => handleRemoveItem(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="signature-section">
            <div className="signature">
              <label htmlFor="signature">Signature and Name of the person in charge of the department:</label>
              <input
                type="text"
                id="signature"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Type your name here....."
              />
              <label htmlFor="hodSignature">Upload Signature Image:</label>
              <input
                type="file"
                id="hodSignature"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setHodSignature)}
              />
            </div>
            <div className="logistic-sign">
              <label htmlFor="logisticSignature">Signature of Delivery:</label>
              <p>Logistician</p>
              Date:
              <input
                type="date"
                id="logisticDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
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

          <div className="signature-section">
            <div className="signature">
              <label htmlFor="ackReceiptSignature">Acknowledgement receipt:</label>
              Date:
              <input
                type="date"
                id="ackReceiptDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <br />
              Names:
              <input type="text" placeholder="Type names here......" /> <br />
              Upload Signature Image:
              <input
                type="file"
                id="ackReceiptSignature"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setAckReceiptSignature)}
              />
            </div>
            <div className="daf-sign">
              <label htmlFor="dafSignature">Signature of DAF:</label>
              Upload Signature Image:
              <input
                type="file"
                id="dafSignature"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setDafSignature)}
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
