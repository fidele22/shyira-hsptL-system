import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './viewitems.css'
import AddItemForm from '../addItem/addingitem';

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Number of items per page

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleEditClick = (item) => {
    setItemToEdit(item);
  };

  const handleDeleteClick = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${itemId}`);
      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleUpdateItem = (updatedItem) => {
    setItems(items.map((item) => (item._id === updatedItem._id ? updatedItem : item)));
    setItemToEdit(null);
  };

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleCancelEdit = () => {
    setItemToEdit(null);
  };

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="view-items">
      <h2>Items List</h2>
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
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item._id}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>
                <button  className="edit-btn" onClick={() => handleEditClick(item)}>Edit</button>
                <button  className="details-btn" onClick={() => handleDeleteClick(item._id)}>Details</button>
                <button  className="delete-btn" onClick={() => handleDeleteClick(item._id)}>Delete</button>
               
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
      {itemToEdit && (
        <AddItemForm
          itemToEdit={itemToEdit}
          onUpdateItem={handleUpdateItem}
          onAddItem={handleAddItem}
          onCancelEdit={handleCancelEdit}
        />
      )}
      </div>
    </div>
  );
};

export default ViewItems;
