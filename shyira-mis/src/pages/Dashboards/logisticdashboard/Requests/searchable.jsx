import React, { useState } from 'react';
import './searchable.css'; // Import CSS for styling

const SearchableDropdown = ({ options, selectedValue, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setSearchQuery('');
    setIsOpen(false);
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="searchable-dropdown">
      <div
        className="dropdown-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue || 'Select an option'}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li>No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
