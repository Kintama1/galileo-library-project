import React, { useState, useEffect } from 'react';
import getHighlightedText from '../../utils/searchUtils';
import './SearchBar.css';

function SearchBar({ books }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsTotal, setSuggestionsTotal] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Update suggestions when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    // Filter books to find titles that match the search term
    const foundSuggestions = books
      .filter(book => 

        book.Title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      // Limit to top 5 suggestions
      ;
    setSuggestionsTotal(foundSuggestions.length)
    setSuggestions(foundSuggestions.slice(0,5));
  }, [searchTerm, books]);
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };
  
  const handleSuggestionClick = (book) => {
    // Navigate to the book detail page 
    window.open(`/book/${book.ID|| ''}`, '_blank');
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
  const handleShowMoreClick = () => {
    // Navigate to advanced search with the current search term in the URL
    window.location.href = `/advanced-search/page/1?term=${encodeURIComponent(searchTerm)}`;
    
    // Or with React Router's useNavigate hook:
    // const navigate = useNavigate();
    // navigate(`/advanced-search?term=${encodeURIComponent(searchTerm)}`);
  };
  const handleAdvancedSearchClick = () => {
    
  }

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
              key={book.ID} 
              onClick={() => handleSuggestionClick(book)}
              className="suggestion-item"
            >
              <div className='author-entry'>
              <span className='label'>Author : </span> {book.Author} <br/>
              </div>
              <div className='title-entry'>
              <span className='label'> Title : </span>
              {getHighlightedText(book.Title, searchTerm)}
              </div>
            </li>
          ))}
          {(suggestionsTotal - 5) > 0 && (
            <li
            key = 'aaa'
            className='suggestion-item more'
            onClick={()=>handleShowMoreClick()}
            >...{suggestionsTotal-5} more search results</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;