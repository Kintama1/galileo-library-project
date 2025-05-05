import React, {useState} from 'react';
import Book from '../Book/Book';
import VolumesModal from '../Modal/VolumesModal';
import { processTitle } from '../../utils/processing';
import './Bookshelf.css';

// Function to return book if it is a multi-vol book for the initial bookshelf display
function returnBook(arrayBook) {
  const book = {};
  book["ID"] = arrayBook[0].ID.slice(0, 4);
  book["ShortTitle"] = arrayBook[0].ShortTitle;
  book["Author"] = arrayBook[0].Author;
  book["Height"] = arrayBook[0].Height;
  book["SpineWidth"] = arrayBook[0].SpineWidth;
  book["Class"] = "multivol";
  
  return book;
}

function Bookshelf({books, multiVol}) {
const [modalOpen, setModalOpen] = useState(false);
const [selectedVolumes, setSelectedVolumes] = useState(null);
const [modalTitle, setModalTitle] = useState('');
const handleMultiVolumeClick = (volumes, title) => {
  setSelectedVolumes(volumes);
  setModalTitle(title);
  setModalOpen(true);
};

  return (
    <>
    <div className='bookshelf'>
      <div className='bookshelf-books'>
        {books.map((book, index) => {
          // Here could include if statement that passes to other bookshelves
          if (Array.isArray(book)) {
            const newBook = returnBook(book);
            return (
              <Book
                key={index + "-array"}
                id={newBook.ID}
                title={processTitle(newBook.ShortTitle)}
                author={newBook.Author}
                height={newBook.Height}
                spineWidth={newBook.SpineWidth}
                editionType={newBook.Class}
                onClick={() => handleMultiVolumeClick(book, processTitle(newBook.ShortTitle))}
              />
            );
          } else {
            const bookProps = {
              key: index,
              id: book.ID,
              title: processTitle(book.ShortTitle),
              author: book.Author,
              height: book.Height,
              spineWidth: book.SpineWidth,
              editionType: book.Class,
            };
            if (multiVol) {
              bookProps.volume = index + 1;
            }
            return (
              <Book {...bookProps}/>
            );
          }
        })}
      </div>
    </div>
    <VolumesModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        volumes={selectedVolumes}
        title={modalTitle}
      />
    </>
  );
}

export default Bookshelf;