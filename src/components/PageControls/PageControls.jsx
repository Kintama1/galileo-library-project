import React from "react";
import { Link, useNavigate } from "react-router-dom";

function PageControls({
  currentPage,
  pageNumbers,
  totalPages,
  urlPattern,
  queryParams = {}
}) {
  const navigate = useNavigate();

  // Function to build the URL with the correct page number and any query parameters
  const buildUrl = (pageNum) => {
    // Replace any instance of :page in the urlPattern with the actual page number
    let url = urlPattern.replace(':page', pageNum);
    
    // Add query parameters if they exist
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    return url;
  };

  // Handle navigation with scroll to top
  const handleNavigation = (pageNum) => {
    const url = buildUrl(pageNum);
    navigate(url);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pagination-controls">
      {currentPage > 1 && (
        <button 
          onClick={() => handleNavigation(currentPage - 1)}
          className="pagination-link"
        >
          Previous
        </button>
      )}
      
      {pageNumbers.map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
        ) : (
          <button 
            key={`page-${page}`}
            onClick={() => handleNavigation(page)}
            className={`pagination-link ${currentPage === page ? 'active' : ''}`}
          >
            {page}
          </button>
        )
      ))}
      
      {currentPage < totalPages && (
        <button 
          onClick={() => handleNavigation(currentPage + 1)}
          className="pagination-link"
        >
          Next
        </button>
      )}
    </div>
  );
}

export default PageControls;