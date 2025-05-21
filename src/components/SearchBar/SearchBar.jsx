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
    
    
    const foundSuggestions = [];
    books.forEach(book=> {
      if (Array.isArray(book)){
        if(book[0] && book[0].Title &&  book[0].Title.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
          foundSuggestions.push({
            ID: book[0].ID.slice(0,4),
            Title: book[0].Title,
            Author: book[0].Author || "Not provided",
            isMultiVolume: true
          })
        }
      }
      else {
        if(book && book.Title && book.Title.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
          foundSuggestions.push(book);
        }
      }

    })
    setSuggestionsTotal(foundSuggestions.length)
    setSuggestions(foundSuggestions.slice(0,5));
  }, [searchTerm, books]);
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };
  
  const handleSuggestionClick = (book) => {
    // Navigate to the book detail page
    if (book.isMultiVolume){
      window.location.href = `/advanced-search/page/1?bookId=${encodeURIComponent(book.ID)}`;
    }
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
              key={book.ID} 
              onClick={() => handleSuggestionClick(book)}
              className="suggestion-item"
            >
              {book.isMultiVolume && (
                <span className='multi-volume-badge'>
                  <svg width="12" height="12" viewBox="0 0 24 24" style={{marginRight: '4px', verticalAlign: 'middle'}}>
                    <path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>
                    <path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/>
                  </svg>
                  Multi-Volume
                </span>
              )}
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