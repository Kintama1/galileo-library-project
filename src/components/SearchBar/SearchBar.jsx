import React, { useState, useEffect } from 'react';
import './SearchBar.css';

function SearchBar({ books }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  
  // Update suggestions when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    // Filter books to find titles that match the search term
    const filteredSuggestions = books
      .filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      // Limit to top 5 suggestions
      .slice(0, 5);
    
    setSuggestions(filteredSuggestions);
  }, [searchTerm, books]);
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };
  
  const handleSuggestionClick = (book) => {
    // Navigate to the book detail page
    window.open(`/book/${book.id || ''}`, '_blank');
    setSearchTerm('');
    setShowSuggestions(false);
  };
  
  // Handle clicking outside to close suggestions
  const handleBlur = () => {
    // Small delay to allow click on suggestion to fire first
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };
  
  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Search for books..." 
        value={searchTerm} 
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={handleBlur}
        className="search-input"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((book) => (
            <li 
              key={book.id} 
              onClick={() => handleSuggestionClick(book)}
              className="suggestion-item"
            >
              {book.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;