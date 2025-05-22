import React from "react";
import SimpleView from "./SimpleView";
import getHighlightedText from "../../utils/searchUtils";
import "./SimpleViewList.css";

function SimpleViewList({ books, searchTerm }) {
  return (
    <div className="simple-view-list">
    {searchTerm && books.map((book, index) => (
    <SimpleView 
      key={index}
      id={book.ID}
      title={getHighlightedText(book.Title, searchTerm)}
      author={book.Author}
      YearofPublication={book.YearofPublication}
      isMultiVolume={book.isMultiVolume}
    />
  ))}
  {!searchTerm && books.map((book, index) => (
    <SimpleView 
      key={index}
      index={index}
      id={book.ID}
      title={book.Title}
      author={book.Author}
      YearofPublication={book.YearofPublication}
      isMultiVolume={false}
      volumes = {true}
    />
  ))}
</div>
  );
}

export default SimpleViewList;