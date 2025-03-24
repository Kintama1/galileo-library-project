import React from "react";
import Card from "../Card/Card";
import { useLibrary } from "../../context/LibraryContext";
import "./css/BookPage.css";
import Layout from "../Layout/Layout";
import { useParams, Link } from "react-router-dom";

function BookPage() {
  const { booksById, loading, error } = useLibrary();
  const { bookId } = useParams();
  const book = booksById[bookId];
  
  if (loading) {
    return <div className="loading-state">Loading book details...</div>;
  }
  
  if (error) {
    return <div className="error-state">Error: {error}</div>;
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