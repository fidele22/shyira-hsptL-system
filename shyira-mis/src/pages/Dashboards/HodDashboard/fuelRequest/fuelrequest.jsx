import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './fuelrequest.css'; // Make sure to add CSS for styling

const RequisitionForm = () => {
  const [requesterName, setRequesterName] = useState('');
  const [carPlaque, setCarPlaque] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [remainingliters, setRemainingLiters] = useState('');
  const [average, setAverage] = useState('');
  const [quantityRequested, setQuantityRequested] = useState('');
  const [quantityReceived, setQuantityReceived] = useState('');
  const [destination, setDestination] = useState('');
  const [reasonOption, setReasonOption] = useState('');
  const [user, setUser] = useState(null);

  const [carOptions, setCarOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [reasonOptions, setReasonOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const carResponse = await axios.get('http://localhost:5000/api/forms-data/cars');
        setCarOptions(carResponse.data);

        const destinationResponse = await axios.get('http://localhost:5000/api/forms-data/destinations');
        setDestinationOptions(destinationResponse.data);

        const reasonResponse = await axios.get('http://localhost:5000/api/forms-data/reasons');
        setReasonOptions(reasonResponse.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);





  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log the state values to ensure they are set correctly
    console.log("Requester Name:", requesterName);
    console.log("Car Plaque:", carPlaque);
    console.log("Kilometers:", kilometers);
    console.log("average:", setAverage);
    console.log("remainingliters:", remainingliters);
    console.log("Quantity Requested:", quantityRequested);
    console.log("Quantity Received:", quantityReceived);
    console.log("Destination:", destination);
    console.log("Modify Option:", reasonOption);

    // Check if all required fields are filled
    if (!requesterName || !carPlaque || !kilometers || !quantityRequested) {
        alert("Please fill in all required fields.");
        return;
    }

    // Create a FormData object
    const formData = {
        requesterName,
        carPlaque,
        kilometers,
        remainingliters,
        average,
        quantityRequested,
        quantityReceived,
        destination,
        reasonOption,
        hodName: user ? `${user.firstName} ${user.lastName}` : '',
        hodSignature: user && user.signature ? user.signature : ''
    };

    try {
        // Send the data to the backend as JSON instead of FormData
        const response = await axios.post('http://localhost:5000/api/fuel-requisition/submit', formData, {
            headers: {
                'Content-Type': 'application/json',
        
            },
        });

        console.log(response.data);
        alert('Requisition submitted successfully!');
        
        // Reset form fields
        setRequesterName('');
        setCarPlaque('');
        setKilometers('');
        setAverage('');
        setRemainingLiters('');
        setQuantityRequested('');
        setQuantityReceived('');
        setDestination('');
        setReasonOption('');
    } catch (error) {
        console.error('Error submitting requisition:', error);
        alert('Error submitting requisition');
    }
};
//fetching user name and signature
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

  return (
    <div className="requisition-form">
      <h2>Fuel Requisition Form</h2>
      <form onSubmit={handleSubmit}>
     
          <div className="user-name">
          <label htmlFor="requesterName">Name of Requester:</label>
          <input
            type="text"
            id="requesterName"
            value={requesterName}
            onChange={(e) => setRequesterName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
        <div className="right">
        <label htmlFor="carPlaque">Plaque of Car:</label>
          <select
            id="carPlaque"
            value={carPlaque}
            onChange={(e) => setCarPlaque(e.target.value)}
            required
          >
            <option value="">Select Plaque</option>
            {carOptions.map((car) => (
              <option key={car._id} value={car.plaque}>
                {car.plaque}
              </option>
            ))}
          </select>
        </div>
        <div className="left">
          <label htmlFor="kilometers">Kilometers:</label>
          <input
            type="number"
            id="kilometers"
            value={kilometers}
            onChange={(e) => setKilometers(e.target.value)}
            required
          />
          </div>
        </div>
        <div className="form-group">
         
         <div className="right">
         <label htmlFor="remainingliters">Remaining liters:</label>
         <input
           type="number"
           id="RemainingLiters"
           value={remainingliters}
           onChange={(e) => setRemainingLiters(e.target.value)}
           required
         />
       </div>
       <div className="left">
       <label htmlFor="average">Average km/l :</label>
         <input
           type="number"
           id="average"
           value={average}
           onChange={(e) => setAverage(e.target.value)}
         />
       </div>
         </div>

        <div className="form-group">
          <div className="right">
          <label htmlFor="quantityRequested">Quantity Requested (liters):</label>
          <input
            type="number"
            id="quantityRequested"
            value={quantityRequested}
            onChange={(e) => setQuantityRequested(e.target.value)}
            required
          />
        </div>
        <div className="left">
        <label htmlFor="quantityReceived">Quantity Received (liters):</label>
          <input
            type="number"
            id="quantityReceived"
            value={quantityReceived}
            onChange={(e) => setQuantityReceived(e.target.value)}
          />
        </div>
          </div>
    
        <div className="form-group">
        <div className="right">
        <label htmlFor="destination">Previous Destination Report:</label>
        <input type="file" />
        </div>
        
        <div className="left">
        <label htmlFor="modifyOption">Reason:</label>
          <select
            id="modifyOption"
            value={reasonOption}
            onChange={(e) => setReasonOption(e.target.value)}
          >
            <option value="">Select Reason</option>
            {reasonOptions.map((reason) => (
              <option key={reason._id} value={reason.description}>
                {reason. reason}
              </option>
            ))}
          </select>
        </div>
        </div>
        
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
        
        <button type="submit">Send Requisition</button>
      </form>
    </div>
  );
};

export default RequisitionForm;
