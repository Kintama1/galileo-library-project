// components/FilterSummary/FilterSummary.jsx
import React from 'react';
import './FilterSummary.css';

function FilterSummary({ filteredCount, totalCount, activeFilters, onReset }) {
  // Determine which filters are active
  const getActiveFilterLabels = () => {
    const labels = [];
    
    if (activeFilters.yearFrom || activeFilters.yearTo) {
      const yearLabel = `Year: ${activeFilters.yearFrom || ''} - ${activeFilters.yearTo || ''}`;
      labels.push(yearLabel);
    }
    
    if (activeFilters.class && activeFilters.class !== 'all') {
      labels.push(`Edition: ${activeFilters.class}`);
    }
    
    if (activeFilters.country && activeFilters.country !== 'all') {
      labels.push(`Country: ${activeFilters.country}`);
    }
    
    if (activeFilters.city && activeFilters.city !== 'all') {
      labels.push(`City: ${activeFilters.city}`);
    }
    
    if (activeFilters.format && activeFilters.format !== 'all') {
      labels.push(`Format: ${activeFilters.format}`);
    }
    
    return labels;
  };
  
  const activeFilterLabels = getActiveFilterLabels();
  const isFiltered = activeFilterLabels.length > 0;
  
  return (
    <div className="filter-summary">
      <div className="results-count">
        Showing <span className="count-highlight">{filteredCount}</span> 
        {isFiltered ? ' filtered' : ''} results out of <span className="count-highlight">{totalCount}</span> total books
      </div>
      
      {isFiltered && (
        <div className="active-filters">
          <div className="active-filters-label">Active filters:</div>
          <div className="filter-badges">
            {activeFilterLabels.map((label, index) => (
              <span key={index} className="filter-badge">{label}</span>
            ))}
            <button className="reset-filters-button" onClick={onReset}>
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterSummary;