// components/FilterSidebar/FilterItem.jsx
import React from 'react';
import './FilterItem.css';

function FilterItem({ 
  title, 
  type = 'text', // text, number, select, range
  name,
  value,
  onChange,
  options = [], // for select type
  placeholder = '',
  min, // for number type
  max  // for number type
}) {
  
  const renderFilterInput = () => {
    switch(type) {
      case 'select':
        return (
          <select 
            name={name}
            value={value}
            onChange={onChange}
            className="filter-input"
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'range':
        return (
          <div className="range-inputs">
            <input
              type="number"
              name={`${name}From`}
              placeholder="From"
              value={value.from || ''}
              onChange={(e) => {
                onChange({
                  target: {
                    name: `${name}From`,
                    value: e.target.value
                  }
                });
              }}
              min={min}
              max={max}
              className="filter-input"
            />
            <span className="range-separator">to</span>
            <input
              type="number"
              name={`${name}To`}
              placeholder="To"
              value={value.to || ''}
              onChange={(e) => {
                onChange({
                  target: {
                    name: `${name}To`,
                    value: e.target.value
                  }
                });
              }}
              min={min}
              max={max}
              className="filter-input"
            />
          </div>
        );
      
      case 'number':
        return (
          <input
            type="number"
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            min={min}
            max={max}
            className="filter-input"
          />
        );
        
      default: // text
        return (
          <input
            type="text"
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            className="filter-input"
          />
        );
    }
  };
  
  return (
    <div className="filter-item">
      <h4 className="filter-title">{title}</h4>
      {renderFilterInput()}
    </div>
  );
}

export default FilterItem;