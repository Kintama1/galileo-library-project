import React, {useState} from "react";
import "./css/LibraryPage.css";
import { getPaginatedBooks, getPageNumbers } from "../../utils/paginate";
import Bookshelf from "../Bookshelf/Bookshelf";
import Layout from "../Layout/Layout";
import SearchBar from "../SearchBar/SearchBar";
import FilterSidebar from "../FilterSideBar/FilterSideBar";
import FilterSummary from "../FilterSideBar/FilterSummary";
import  PageControls  from "../PageControls/PageControls";
import BookLegend from "../Book/BookLegend";
import { useParams, Link } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { filterBooks } from "../../utils/bookFilters";

function LibraryPage() {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const { booksById, loading, error,  debouncedFilters, resetFilters } = useLibrary();
    const { pageNumber } = useParams();
    
    if (loading) {
        return <div className="loading-state">Loading the Galileo Library...</div>;
    }
    
    if (error) {
        return <div className="error-state">Error: {error}</div>;
    }
    const currentPage = pageNumber ? parseInt(pageNumber) : 1;
    const booksPerPage = 100;
    const totalBooks = Object.keys(booksById).length;
    const totalPages = Math.ceil(totalBooks / booksPerPage);
    
    // Function to generate page numbers to display
   
    const pageNumbers = getPageNumbers(currentPage, totalPages);
    const handleSidebarToggle = (isExpanded) => {
        setSidebarExpanded(isExpanded);
    };
    const booksArray = Object.values(booksById);
    const filteredBooks = sidebarExpanded ? filterBooks(booksArray, debouncedFilters) : booksArray;

    const pageBooks = getPaginatedBooks(currentPage, filteredBooks);


    return (
        <Layout>
      <div className={`library-page ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
        <FilterSidebar onSidebarToggle={handleSidebarToggle} />
        <Link to="/" className="home-link">Back to Home</Link>
        
        <div className="library-header">
          <h1>Galileo's Library</h1>
          <div className="nav">
            <SearchBar books={booksArray} />
           
          </div>
           <div className="legend-container">
                <BookLegend />
            </div>
          {(debouncedFilters.yearFrom || debouncedFilters.yearTo || 
            debouncedFilters.class !== 'all' || 
            debouncedFilters.country !== 'all' || 
            debouncedFilters.city !== 'all' || 
            debouncedFilters.format !== 'all') && (
            <div className="active-filters-indicator">
                Filters applied
            </div>
            )}
        </div>
        
        {filteredBooks.length === 0 ? (
        <div className="no-results">
            <h3>No books match your filter criteria</h3>
            <button 
            className="reset-button" 
            onClick={resetFilters}
            >
            Reset Filters
            </button>
        </div>
        ) : (
            <>
            <FilterSummary 
                filteredCount={filteredBooks.length}
                totalCount={totalBooks}
                activeFilters={debouncedFilters}
                onReset={resetFilters}
                />
        <Bookshelf books={pageBooks} />
        </>
        )}
           <PageControls
            currentPage={currentPage}
            pageNumbers={pageNumbers}
            totalPages={totalPages}
            urlPattern="/library/page/:page"
        />
        </div>

    </Layout>
    );
}

export default LibraryPage;