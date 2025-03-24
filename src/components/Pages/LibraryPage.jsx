import React, {useState} from "react";
import "./css/LibraryPage.css";
import { getPaginatedBooks } from "../../utils/paginate";
import Bookshelf from "../Bookshelf/Bookshelf";
import Layout from "../Layout/Layout";
import SearchBar from "../SearchBar/SearchBar";
import FilterSidebar from "../FilterSideBar/FilterSideBar";
import FilterSummary from "../FilterSideBar/FilterSummary";
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
    const getPageNumbers = () => {
        const pages = [];
        // Always show first page
        pages.push(1);
        
        // Calculate range to display
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);
        
        // Add ellipsis after first page if needed
        if (startPage > 2) {
            pages.push('...');
        }
        
        // Add page numbers in the middle
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        // Add ellipsis before last page if needed
        if (endPage < totalPages - 1) {
            pages.push('...');
        }
        
        // Always show last page if there is more than one page
        if (totalPages > 1) {
            pages.push(totalPages);
        }
        
        return pages;
    };
    
    const pageNumbers = getPageNumbers();
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
          <h1>Galileo Library</h1>
          <div className="nav">
            <SearchBar books={booksArray} />
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
            <div className="pagination-controls">
                {currentPage > 1 && (
                    <Link to={`/library/page/${currentPage - 1}`} className="pagination-link">Previous</Link>
                )}
                
                {pageNumbers.map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
                    ) : (
                        <Link 
                            key={`page-${page}`}
                            to={`/library/page/${page}`}
                            className={`pagination-link ${currentPage === page ? 'active' : ''}`}
                        >
                            {page}
                        </Link>
                    )
                ))}
                
                {currentPage < totalPages && (
                    <Link to={`/library/page/${currentPage + 1}`} className="pagination-link">Next</Link>
                )}
            </div>
        </div>

    </Layout>
    );
}

export default LibraryPage;