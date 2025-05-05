import React, { useState, useEffect } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { useLibrary } from '../../context/LibraryContext';
import Layout from '../Layout/Layout';
import SearchBar from '../SearchBar/SearchBar';
import SimpleViewList from '../SimpleView/SimpleViewList'
import PageControls from '../PageControls/PageControls';
import { getPaginatedBooks, getPageNumbers} from '../../utils/paginate'; 
import './css/AdvancedSearchPage.css';

function AdvancedSearch(){
  const { pageNumber } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  
  const {booksById, loading, error } = useLibrary();
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [totalResults, setTotalResults] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [pageNumbers, SetPageNumbers] = useState([]);
  const searchTerm = searchParams.get('term');
    // Number of search results to show per page
  const resultsPerPage = 20;
  console.log(booksById);
  // Calculate current page
  const currentPage = pageNumber ? parseInt(pageNumber) : 1;
  
  // Perform the search when the component mounts or the searchTerm changes
  useEffect(() => {
    if (searchTerm && !loading && Object.keys(booksById).length > 0) {
      console.log("Running search with loaded books");
      const booksArray = Object.values(booksById);
      // Filter books that match the search term
      const results = booksArray.filter(book => 
        book.Title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchTerm, booksById, loading]);
  
 // Modified second useEffect
useEffect(() => {
  if (searchResults.length > 0) {
    // Calculate total pages based on search results
    const total = searchResults.length;
    setTotalResults(total);
    
    const pages = Math.ceil(total / resultsPerPage);
    setTotalPages(pages);
    
    // Get paginated results only when needed
    const paginatedResults = getPaginatedBooks(currentPage, searchResults, resultsPerPage);
    setFilteredResults(paginatedResults);
    
    // Calculate page numbers
    SetPageNumbers(getPageNumbers(currentPage, pages));
  } else {
    // Reset when no results
    setTotalResults(0);
    setTotalPages(0);
    setFilteredResults([]);
    SetPageNumbers([]);
  }
}, [searchResults, currentPage, resultsPerPage]);

  if (loading) {
    return <div className="loading-state">Loading...</div>;
  }
  
  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }

    return (
        <Layout>
              <div className="navigation-bar">
                <Link to="/library/page/1" className="back-button">
                  ← Back to Library
                </Link>
              </div>
              <SearchBar/>
              {(searchTerm) ? (
                <div>
                  <h1>Advanced Search Results</h1>
                  <p className="search-info">
                    Showing results {Math.min(totalResults, (currentPage - 1) * resultsPerPage + 1)} - {Math.min(totalResults, currentPage * resultsPerPage)} of {totalResults} for: 
                    <span className="search-term"> {searchTerm}</span>
                  </p>
                  <div className="search-results">
                  {filteredResults.length > 0 ? ( 
                  <SimpleViewList key={pageNumber} books={filteredResults} searchTerm = {searchTerm} />
                    
                  ) : (
                    <p className="no-results">No books found matching your search.</p>
                  )}
                </div>
                <PageControls
                  currentPage={currentPage}
                  pageNumbers={pageNumbers}
                  totalPages={totalPages}
                  urlPattern="/advanced-search/page/:page"
                  queryParams={{ term: searchTerm }}
                />
                </div>
                  
              ) : (
                <div className='empty-search'>
                  <p> Search for a book!</p>
                </div>

              ) }
        </Layout>
    )

}

export default AdvancedSearch;