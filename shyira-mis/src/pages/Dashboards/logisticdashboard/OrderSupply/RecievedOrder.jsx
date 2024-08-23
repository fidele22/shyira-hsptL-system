// src/components/ApprovedRequests.js
import React, { useState, useEffect } from 'react';
import { FaQuestionCircle, FaEdit,FaTimes, FaTimesCircle, FaCheck,
     FaCheckCircle, FaCheckDouble, FaCheckSquare } from 'react-icons/fa';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useDropzone } from 'react-dropzone';
import './modelMessage.css'  // Import Dropzone for file attachment

const ApprovedRequests = () => {
  const [requests, setRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [fileAttachments, setFileAttachments] = useState([]);
  const [searchParams, setSearchParams] = useState({
    department: '',
    date: ''
  });

  const [logisticUsers, setLogisticUsers] = useState([]);
  const [dafUsers, setDafUsers] = useState([]);
  const [dgUsers, setDgUsers] = useState([]);

  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(''); //
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    fetchApprovedRequests();
    fetchLogisticUsers();
    fetchDafUsers();
    fetchDgUsers();
  }, []);

  const fetchLogisticUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/logistic-users');
      setLogisticUsers(response.data);
    } catch (error) {
      console.error('Error fetching logistic users:', error);
    }
  };

  const fetchDafUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/daf-users');
      setDafUsers(response.data);
    } catch (error) {
      console.error('Error fetching daf users:', error);
    }
  };
  const fetchDgUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/DG-users');
      setDgUsers(response.data);
    } catch (error) {
      console.error('Error fetching daf users:', error);
    }
  };

  const fetchApprovedRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/LogisticRequest/received-order');
      setRequests(response.data);
      setFilteredRequests(response.data); 
    } catch (error) {
      console.error('Error fetching approved requests:', error);
    }
  };

  const handleRequestClick = async (requestId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/LogisticRequest/received/${requestId}`);
      setSelectedRequest(response.data);
      setApprovedRequests(response.data);

      // Fetch associated file attachments
      const attachmentsResponse = await axios.get(`http://localhost:5000/api/LogisticRequest/attachments/${requestId}`);
      setFileAttachments(attachmentsResponse.data);

      await axios.put(`http://localhost:5000/api/approve/${requestId}`, { clicked: true });
      fetchApprovedRequests();
    } catch (error) {
      console.error('Error fetching request details:', error);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  const handleSearchRequest = (e) => {
    e.preventDefault();
    const { supplierName, date } = searchParams;
    const filtered = requests.filter(request => {
      return (!supplierName || request.supplierName.toLowerCase().includes(supplierName.toLowerCase())) &&
             (!date || new Date(request.date).toDateString() === new Date(date).toDateString());
    });
    setFilteredRequests(filtered);
  };

  const downloadPDF = async () => {
    const input = document.getElementById('pdf-content');
    if (!input) {
      console.error('Element with ID pdf-content not found');
      return;
    }
    
    try {
      const canvas = await html2canvas(input);
      const data = canvas.toDataURL('image/png');

      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      pdf.addImage(data, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('requisition-form.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('files', file);
    });

    try {
      await axios.post(`http://localhost:5000/api/LogisticRequest/upload/${selectedRequest._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Files uploaded successfully');
      handleRequestClick(selectedRequest._id);  // Refresh attachments after upload
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="approved-requests-page">
      <h2>Order marked as Received</h2>
      <form onSubmit={handleSearchRequest} className="search-form">
        <div className='search-supplier Name'>
          <label htmlFor="">Search by supplier Name</label>
          <input
            type="text"
            name="supplierName"
            placeholder="Search by Supplier Name"
            value={searchParams.supplierName}
            onChange={handleSearchChange}
          />
        </div>
      
        <div className='search-date'>
          <label htmlFor="">Search by date</label>
          <input
            type="date"
            name="date"
            placeholder="Search by date"
            value={searchParams.date}
            onChange={handleSearchChange}
          />
        </div>
        
        <button type="submit" className='search-btn'>Search</button>
      </form>

      <div className="approved-navigate-request">
        <ul>
          {filteredRequests.slice().reverse().map((request, index) => (
            <li key={index}>
              <p onClick={() => handleRequestClick(request._id)}>
                Requisition Form of logistic from <b>{request.supplierName}</b> done on {new Date(request.date).toDateString()}
                <span>{request.clicked ? '' : 'New Request: '}</span> <label htmlFor=""><FaCheckCircle/>Received</label>
              </p>
            </li>
          ))}
        </ul>
      </div>
      
      {selectedRequest && (
        <div className="approved-request-overlay">
          <div className="form-navigation">
            <button className='request-dowload-btn' onClick={downloadPDF}>Download Pdf</button>
            <label className='request-cancel-btn' onClick={() => setSelectedRequest(null)}><FaTimes /></label>
          </div>  
          
          <div className="request-details" >
            <div id='pdf-content'>
              <div className="image-request-recieved">
                <img src="/image/logo2.png" alt="Logo" className="logo" />
              </div>
              <div className="request-recieved-heading">
                <h1>WESTERN PROVINCE</h1>
                <h1>DISTRIC: NYABIHU</h1>
                <h1>HEALTH FACILITY: SHYIRA DISTRICT HOSPITAL</h1>
                <h1>DEPARTMENT: <span></span> </h1>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Item Name</th>
                    <th>Quantity Requested</th>
                    <th>Price</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRequest.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.itemName}</td>
                      <td>{item.quantityRequested}</td>
                      <td>{item.price}</td>
                      <td>{item.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="approved-signature-section">
                <div className='logistic-signature'>
                  <h3>Logistic Office:</h3>
                  <label htmlFor="">Prepared By:</label>
                  {logisticUsers.map(user => (
                    <div key={user._id} className="logistic-user">
                      <p>{user.firstName} {user.lastName}</p>
                      {user.signature ? (
                        <img src={`http://localhost:5000/${user.signature}`} alt={`${user.firstName} ${user.lastName} Signature`} />
                      ) : (
                        <p>No signature available</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className='daf-signature'>
                  <h3>DAF Office:</h3>
                  <label htmlFor="">Verified By:</label>
                  {dafUsers.map(user => (
                    <div key={user._id} className="daf-user">
                      <p>{user.firstName} {user.lastName}</p>
                      {user.signature ? (
                        <img src={`http://localhost:5000/${user.signature}`} alt={`${user.firstName} ${user.lastName} Signature`} />
                      ) : (
                        <p>No signature available</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className='daf-signature'>
                  <h3>DG Office:</h3>
                  <label htmlFor="">Approved By:</label>
                  {dgUsers.map(user => (
                    <div key={user._id} className="daf-user">
                      <p>{user.firstName} {user.lastName}</p>
                      {user.signature ? (
                        <img src={`http://localhost:5000/${user.signature}`} alt={`${user.firstName} ${user.lastName} Signature`} />
                      ) : (
                        <p>No signature available</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className='logistic-signature'>
                  <h3>Logistic Office:</h3>
                  <label htmlFor="">Received By:</label>
                  {logisticUsers.map(user => (
                    <div key={user._id} className="logistic-user">
                      <p>{user.firstName} {user.lastName}</p>
                      {user.signature ? (
                        <img src={`http://localhost:5000/${user.signature}`} alt={`${user.firstName} ${user.lastName} Signature`} />
                      ) : (
                        <p>No signature available</p>
                      )}
                    </div>
                  ))}
                </div>
                {/* File Attachment Section */}
                <div className="file-attachments">
                  <h3>File Attachments:</h3>
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                  <ul>
                    {fileAttachments.map((file, index) => (
                      <li key={index}>
                        <a href={`http://localhost:5000/${file.path}`} target="_blank" rel="noopener noreferrer">
                          {file.originalname}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div> 
          </div> 
        </div> 
      )}
    </div>
  );
};

export default ApprovedRequests;
