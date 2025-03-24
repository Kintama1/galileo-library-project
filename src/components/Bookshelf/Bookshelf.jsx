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
                      id = {book.id}
                      title={processTitle(book.title)}
                      author={book.author}
                      height={book.height}
                      spineWidth={book.spineWidth}
                      editionType={book.editionType}
                  />
              ))}
          </div>
      </div>
  );
}
export default Bookshelf