
  export const getPaginatedBooks = (page,booksByID,booksPerPage = 100) => {
    const startIndex = (page -1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    return booksByID.slice(startIndex,endIndex);
  }

  export const getPageNumbers = (currentPage,totalPages) => {
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
