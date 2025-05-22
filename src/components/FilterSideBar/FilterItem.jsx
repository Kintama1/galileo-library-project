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
    case 'multiselect':
      return (
        <div className="checkbox-multiselect">
          {options.map(option => (
            <div key={option.value} className="checkbox-option">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onChange={() => {
                    let newValue;
                    if (Array.isArray(value)) {
                      if (value.includes(option.value)) {
                        newValue = value.filter(val => val !== option.value);
                      } else {
                        newValue = [...value, option.value];
                      }
                    } else {
                      newValue = [option.value];
                    }
                    
                    onChange({
                      target: {
                        name: name,
                        value: newValue
                      }
                    });
                  }}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">{option.label}</span>
              </label>
            </div>
          ))}
          
          {/* Display selected options as tags */}
          {Array.isArray(value) && value.length > 0 && (
            <div className="selected-tags">
              {value.map(val => {
                const option = options.find(opt => opt.value === val);
                return option && (
                  <div key={val} className="selected-tag">
                    {option.label}
                    <button 
                      className="remove-tag"
                      onClick={() => {
                        const newValue = value.filter(v => v !== val);
                        onChange({
                          target: {
                            name: name,
                            value: newValue
                          }
                        });
                      }}
                      aria-label={`Remove ${option.label}`}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
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