import React from "react";

export default function getHighlightedText(text, highlight) {
  // Escape special regex characters in the search term
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Create a regular expression that's safe to use
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  
  // Split the text by the regex and map the parts
  const parts = text.split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) ? 
      <span key={index} className="highlighted">{part}</span> : 
      <span key={index}>{part}</span>
  );
}