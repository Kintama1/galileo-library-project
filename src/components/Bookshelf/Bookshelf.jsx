import React from 'react';
import Book from  '../Book/Book';
import { processTitle } from '../../utils/processing';
import './Bookshelf.css';

function Bookshelf({books}) {
  return (
      <div className='bookshelf'>
          <div className='bookshelf-books'>
              {books.map((book, index) => (
                  <Book
                      key={index}
                      id = {book.ID}
                      title={processTitle(book.Title)}
                      author={book.Author}
                      height={book.Height}
                      spineWidth={book.SpineWidth}
                      editionType={book.Class}
                  />
              ))}
          </div>
      </div>
  );
}
export default Bookshelf