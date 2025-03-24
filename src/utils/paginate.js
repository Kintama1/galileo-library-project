
  export const getPaginatedBooks = (page,booksByID,booksPerPage = 100) => {
    const startIndex = (page -1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    return booksByID.slice(startIndex,endIndex);
  }
