import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/admin.css'
//import AddItemForm from '../addItem/addingitem';

const ViewItems = () => {
  //const [items, setItems] = useState([]);
  //const [itemToEdit, setItemToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of items per page
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    service: '',
    department: '',
    phone: '',
    email: '',
    role:'',
    signature: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUsers();
    }, []);
  

    const handleEditClick = (user) => {
        setEditingUser(user._id);
        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          position: user.positionId.positionName,
          service: user.serviceId.service_name,
          department: user.departmentId.departmentName,
          phone: user.phone,
          email: user.email,
          role:user.role,
          signature: user.signature,
        });
      };
    
      const handleDeleteClick = async (userId) => {
        try {
          await axios.delete(`http://localhost:5000/api/users/${userId}`);
          setUsers(users.filter((user) => user._id !== userId));
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`http://localhost:5000/api/users/${editingUser}`, formData);
          setUsers(users.map((user) => (user._id === editingUser ? { ...user, ...formData } : user)));
          setEditingUser(null);
          setFormData({
            firstName: '',
            lastName: '',
            position: '',
            service: '',
            department: '',
            phone: '',
            email: '',
            role:'',
            signature: '',
          });
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };
    

  // Filter items based on search term
 const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentusers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="view-items">
      <h2>Users List</h2>
      <div className='items-table'>

     <div className="searchbar">
     <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
     </div>
     
     <table>
        <thead>
          <tr>
            <th>No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Service</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Role</th>
            <th>Signature</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentusers.map((user,index) => (
            <tr key={user._id}>
              <td>{index}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.positionId ? user.positionId.positionName : 'N/A'}</td>
              <td>{user.serviceId ? user.serviceId.service_name : 'N/A'}</td>
              <td>{user.departmentId ? user.departmentId.departmentName : 'N/A'}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.signature}</td>
              <td>
                <button onClick={() => handleEditClick(user)}>Edit</button>
                <button onClick={() => handleDeleteClick(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
      {/* Add item form if editing */}
      {editingUser && (
        <form onSubmit={handleSubmit}>
        <h2>Edit User</h2>
        <label>First Name</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        <label>Last Name</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        <label>Position</label>
        <select name="position" value={formData.position} onChange={handleChange} >
                <option value="">Select Position</option>
                <option value="position1">Position 1</option>
                <option value="position2">Position 2</option>
                <option value="position3">Position 3</option>
              </select>
        
        <label>Service</label>
        <select name="service" value={formData.service} onChange={handleChange}>
                <option value="">Select Service</option>
                <option value="service1">Service 1</option>
                <option value="service2">Service 2</option>
                <option value="service3">Service 3</option>
              </select>
        <label>Department</label>
        <select name="department" value={formData.department} onChange={handleChange}>
                <option value="">Select Department</option>
                <option value="department1">Department 1</option>
                <option value="department2">Department 2</option>
                <option value="department3">Department 3</option>
              </select>
        <label>Phone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        <label>Role</label>
        <select name="role" value={formData.role} onChange={handleChange}>
                <option value="">Select Role</option>
                <option value="logistic">LOGISTIC</option>
                <option value="accountant">ACCOUNTANT</option>
                <option value="dg">DG</option>
              </select>
        <label>Signature</label>
        <input type="text" name="signature" value={formData.signature} onChange={handleChange} />
        <button type="submit">Update user</button>
        <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
      </form>
    )}
      </div>
    </div>
  );
};

export default ViewItems;
