import React, { useState } from 'react';
import './BookLegend.css';

function BookLegend() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleLegend = () => {
    setIsExpanded(!isExpanded);
  };
  
  if (!isExpanded) {
    return (
      <div className="legend-button-container">
        <button className="legend-button" onClick={toggleLegend}>
          Book Legend <span className="plus-icon">+</span>
        </button>
      </div>
    );
  }
  
  return (
    <div className="book-legend">
      <div className="legend-header" onClick={toggleLegend}>
        <h3 className="legend-title">Book Legend</h3>
        <button className="close-button" >−</button>
      </div>
      
      <div className="legend-content">
        <div className="legend-section">
          <h4>Edition Types</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="color-sample unspecified"></div>
              <div className="legend-description">
                <span className="legend-label">Standard Edition</span>
                <span className="legend-detail">Common printings</span>
              </div>
            </div>
            
            <div className="legend-item">
              <div className="color-sample first-known"></div>
              <div className="legend-description">
                <span className="legend-label">First Known Edition</span>
                <span className="legend-detail">Earliest documented versions</span>
              </div>
            </div>
            
            <div className="legend-item">
              <div className="color-sample known"></div>
              <div className="legend-description">
                <span className="legend-label">Known Edition</span>
                <span className="legend-detail">Documented specific editions</span>
              </div>
            </div>
            
            <div className="legend-item">
              <div className="color-sample manuscript"></div>
              <div className="legend-description">
                <span className="legend-label">Manuscript</span>
                <span className="legend-detail">Handwritten documents</span>
              </div>
            </div>
            
            <div className="legend-item">
              <div className="color-sample multivol"></div>
              <div className="legend-description">
                <span className="legend-label">Multi-Volume</span>
                <span className="legend-detail">Works spanning multiple books</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="legend-section">
          <h4>Book Formats</h4>
          <div className="format-items">
            <div className="format-item">
              <div className="format-sample format-2"></div>
              <div className="format-description">
                <span className="format-label">Folio (2°)</span>
                <span className="format-detail">Largest format - sheet folded once</span>
              </div>
            </div>
            
            <div className="format-item">
              <div className="format-sample format-4"></div>
              <div className="format-description">
                <span className="format-label">Quarto (4°)</span>
                <span className="format-detail">Sheet folded twice</span>
              </div>
            </div>
            
            <div className="format-item">
              <div className="format-sample format-8"></div>
              <div className="format-description">
                <span className="format-label">Octavo (8°)</span>
                <span className="format-detail">Common size - sheet folded three times</span>
              </div>
            </div>
            
            <div className="format-item">
              <div className="format-sample format-12"></div>
              <div className="format-description">
                <span className="format-label">Duodecimo (12°)</span>
                <span className="format-detail">Sheet folded four times</span>
              </div>
            </div>
            
            <div className="format-item">
              <div className="format-sample format-16"></div>
              <div className="format-description">
                <span className="format-label">Sextodecimo (16°)</span>
                <span className="format-detail">Smaller format</span>
              </div>
            </div>
            
            <div className="format-item">
              <div className="format-sample format-32"></div>
              <div className="format-description">
                <span className="format-label">32° format</span>
                <span className="format-detail">Very small format books</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookLegend;