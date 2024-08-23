import React, { useState } from 'react';
import axios from 'axios';

const AddForm = () => {
  const [plaque, setPlaque] = useState('');
  const [reason, setReason] = useState('');
  const [destinationname, setDestination] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send car plaque to the server
      await axios.post('http://localhost:5000/api/forms-data/add-car-plaque', { plaque });
      await axios.post('http://localhost:5000/api/forms-data/add-reason', { reason });
      await axios.post('http://localhost:5000/api/forms-data/add-destination', { destinationname });

      alert('Data submitted successfully!');

      // Reset the form
      setPlaque('');
      setReason('');
      setDestination('');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div>
      <h2>Add Car Plaque, Reason, and Destination</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="plaque">Car Plaque:</label>
          <input
            type="text"
            id="plaque"
            value={plaque}
            onChange={(e) => setPlaque(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="reason">Reason:</label>
          <input
            type="text"
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            value={destinationname}
            onChange={(e) => setDestination(e.target.value)}
         
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddForm;
