import React from "react";
import './SimpleView.css';

function SimpleView( book ) {
  function handleClick() {
    if (book.isMultiVolume) {
    
    window.open(`/advanced-search/page/1?bookId=${encodeURIComponent(book.id)}`, '_blank');
    }
    else {
      window.open(`/book/${book.id || ''}`, '_blank');
      
    }
  };  
  return (
    <div className="simple-view-container" onClick={handleClick}>
      {book.isMultiVolume &&(
                <span className='multi-volume-badge'>
                  <svg width="12" height="12" viewBox="0 0 24 24" style={{marginRight: '4px', verticalAlign: 'middle'}}>
                    <path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>
                    <path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/>
                  </svg>
                  Multi-Volume
                </span>
        )}
       {book.volumes && (
        <div className="book-info-row">
        <span className="book-info-label">Volume:</span>
        <span className="book-info-value">{book.index + 1}</span>
        </div>
          
        )}
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