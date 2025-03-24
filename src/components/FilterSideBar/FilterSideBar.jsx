// Update FilterSidebar.jsx
import React, {useState} from 'react';
import FilterItem from './FilterItem';
import { useLibrary } from '../../context/LibraryContext';
import './FilterSidebar.css';

function FilterSidebar({ onSidebarToggle, onFilterChange }) {
  const [expanded, setExpanded] = useState(false);
  const { 
    filters, 
    filterConfig, 
    updateFilter, 
    resetFilters 
  } = useLibrary();

  const toggleSidebar = () => {
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);
    
    // Notify parent component of change
    if (onSidebarToggle) {
      onSidebarToggle(newExpandedState);
    }
  };
    const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    // Handle range inputs (yearFrom, yearTo)
    if (name.endsWith('From') || name.endsWith('To')) {
      updateFilter(name, value);
    } else {
      updateFilter(name, value);
    }
  };
  console.log(filters);
  if (!filterConfig) {
    return (
      <div className={`filter-sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
        <button 
          className="toggle-button"
          onClick={toggleSidebar}
        >
          <span className="filter-icon">
            {expanded ? '›' : '‹'}
          </span>
          <span className="filter-text">Filters</span>
        </button>
        
        <div className="filter-content">
          <h3>Loading filters...</h3>
        </div>
      </div>
    );
  }
  return (
    <div className={`filter-sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
      <button 
        className="toggle-button"
        onClick={toggleSidebar}
      >
        <span className="filter-icon">
          {expanded ? '›' : '‹'}
        </span>
        <span className="filter-text">Filters</span>
      </button>
      
      <div className="filter-content">
        <h3>Filter Books</h3>
        
        {/* Year Range Filter */}
        <FilterItem
          title={filterConfig.yearRange.title}
          type={filterConfig.yearRange.type}
          name={filterConfig.yearRange.name}
          value={{
            from: filters.yearFrom,
            to: filters.yearTo
          }}
          onChange={handleFilterChange}
          min={filterConfig.yearRange.min}
          max={filterConfig.yearRange.max}
        />
        
        {/* Edition Type Filter */}
        <FilterItem
          title={filterConfig.class.title}
          type={filterConfig.class.type}
          name={filterConfig.class.name}
          value={filters.class}
          onChange={handleFilterChange}
          options={filterConfig.class.options}
        />
 
        {/* Country Filter */}
        <FilterItem
          title={filterConfig.country.title}
          type={filterConfig.country.type}
          name={filterConfig.country.name}
          value={filters.country}
          onChange={handleFilterChange}
          options={filterConfig.country.options}
        />
        
        {/* City Filter */}
        <FilterItem
          title={filterConfig.city.title}
          type={filterConfig.city.type}
          name={filterConfig.city.name}
          value={filters.city}
          onChange={handleFilterChange}
          options={filterConfig.city.options}
        />
        
        {/* Format Filter */}
        <FilterItem
          title={filterConfig.format.title}
          type={filterConfig.format.type}
          name={filterConfig.format.name}
          value={filters.format}
          onChange={handleFilterChange}
          options={filterConfig.format.options}
        />
        
        {/* Reset Filters Button */}
        
        <button className="reset-filters" onClick={resetFilters}>
          Reset All Filters
        </button>
      </div>
    </div>
  );
}
      

export default FilterSidebar;