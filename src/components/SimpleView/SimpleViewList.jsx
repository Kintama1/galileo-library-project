import React from "react";
import SimpleView from "./SimpleView";
import getHighlightedText from "../../utils/searchUtils";
import "./SimpleViewList.css";

function SimpleViewList({ books, searchTerm }) {
  console.log(books);
  return (
    <div className="simple-view-list">
      {books.map((book, index) => (
        <SimpleView 
        key={index} 
        id={book.ID}
        title = {getHighlightedText(book.Title,searchTerm)}
        author = {book.Author}
        YearofPublication = {book.YearofPublication}/>
      ))}
    </div>
  );
}

export default SimpleViewList;