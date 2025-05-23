import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.css';

function Tooltip({ children, content }) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  
  // Function to adjust tooltip position if it goes off screen
  const adjustPosition = () => {
    if (isVisible && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // If tooltip overflows on the right
      if (rect.right > viewportWidth) {
        tooltipRef.current.style.left = 'auto';
        tooltipRef.current.style.right = '0';
        
        // Also adjust the arrow
        const arrow = tooltipRef.current.querySelector('.tooltip-arrow');
        if (arrow) {
          arrow.style.left = 'auto';
          arrow.style.right = '20px';
        }
      }
    }
  };
  
  // Adjust position when tooltip becomes visible
  useEffect(() => {
    if (isVisible) {
      adjustPosition();
    }
  }, [isVisible]);
  
  return (
    <div className="tooltip-container">
      <div 
        className="tooltip-trigger"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
        {isVisible && content && (
          <div className="tooltip-content" ref={tooltipRef}>
            {content}
            <div className="tooltip-arrow"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tooltip;