import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './additem.css'

const AddItemForm = ({ itemToEdit, onUpdateItem, onAddItem, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        name: itemToEdit.name,
        description: itemToEdit.description,
        category: itemToEdit.category,
        price: itemToEdit.price,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
      });
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (itemToEdit) {
        const response = await axios.put(`http://localhost:5000/api/items/${itemToEdit._id}`, formData);
        onUpdateItem(response.data);
      } else {
        const response = await axios.post('http://localhost:5000/api/items/add', formData);
        onAddItem(response.data);
     
      }
      alert('Item saved successfully');
        // Clear form after successful submission
        setFormData({
          name: '',
          description: '',
          category: '',
          price: '',
        });
    }
     catch (error) {
      console.error('Error saving item:', error);
      alert('Item saved successfully');
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
      });
    }
  };

  const handleCancel = () => {
    onCancelEdit();
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
    });
  };

  return (
    <div className="add-item">
 <h1>{itemToEdit ? 'Edit Item' : 'Add New Item'}</h1>
 
    <div className="add-form">
      <h2>{itemToEdit ? 'Edit Item' : 'Add New Item'}</h2>
      <form onSubmit={handleSubmit}>
        
      <div className='loginsignup-fields'>
            <div className='flex-container'>
              <div className='left'>
                <label>Item Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className='right'>
                <label>Price</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
              </div>
             
            </div>
            <div className='flex-container'>
              <div className='left'>
                <label htmlFor="">Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} required />
              </div>
              <div className='right'>
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
              </div>
            </div> 
            </div>
        <div className="form-actions">
          <button type="submit">{itemToEdit ? 'Update Item' : 'Add Item'}</button>
          {itemToEdit && <button type="button" onClick={handleCancel}>Cancel</button>}
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddItemForm;
