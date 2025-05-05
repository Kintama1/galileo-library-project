import React from "react";
import './SimpleView.css';

function SimpleView(book ) {
  function handleClick() {
    window.open(`/book/${book.id || ''}`, '_blank');
  };
  console.log(book);
  
  return (
    <div className="simple-view-container" onClick={handleClick}>
      <div className="book-info-row">
        <span className="book-info-label">Title:</span>
        <span className="book-info-value">{book.title || 'Unknown Title'}</span>
      </div>
      
      <div className="book-info-row">
        <span className="book-info-label">Author:</span>
        <span className="book-info-value">{book.author || 'Unknown Author'}</span>
      </div>
      
      {book.YearofPublication && (
        <div className="book-info-row">
          <span className="book-info-label">Year:</span>
          <span className="book-info-value">{book.YearofPublication}</span>
        </div>
      )}
    </div>
  );
}

export default SimpleView;