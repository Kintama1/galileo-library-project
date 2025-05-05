import React from "react";
import Card from "../Card/Card";
import { useLibrary } from "../../context/LibraryContext";
import "./css/BookPage.css";
import Layout from "../Layout/Layout";
import { useParams, Link } from "react-router-dom";

function BookPage() {
  const { booksById, loading, error } = useLibrary();
  console.log(booksById);
  const { bookId } = useParams();
  console.log("I can see this page");
  
  if (loading) {
    return <div className="loading-state">Loading book details...</div>;
  }
  
  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }
    // At this point, we know booksById is loaded and can be safely used
    let book;
  
    // Handle multi-volume books with alpha ID
    if (bookId.length > 4) {
      const baseId = bookId.slice(0, 4);
      const volumeIndex = bookId.slice(4, 5).charCodeAt(0) - 97;
      
      // Only attempt to access the array if it exists and is an array
      if (booksById[baseId] && Array.isArray(booksById[baseId])) {
      
        book = {Volume : volumeIndex + 1,
          ...booksById[baseId][volumeIndex]};
      }
    } else {
      book = booksById[bookId];
    }
  
  return (
    <Layout>
    <div className="book-page-container">
      <div className="navigation-bar">
        <Link to="/library/page/1" className="back-button">
          ← Back to Library
        </Link>
      </div>
      
      <div className="decorative-header"></div>
      
      {book ? (
        <div className="book-content">
          <Card book={book} />
          
        </div>
      ) : (
        <div className="book-not-found">
          <h2>Book Not Found</h2>
          <p>The requested book could not be found in the library.</p>
        </div>
      )}
    </div>
    </Layout>
  );
}

export default BookPage;