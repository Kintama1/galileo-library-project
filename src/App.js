import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdvancedSearchPage from './components/Pages/AdvancedSearchPage'
import HomePage from './components/Pages/HomePage';
import LibraryPage from './components/Pages/LibraryPage';
import BookPage from './components/Pages/BookPage';
import SimpleViewList from './components/SimpleView/SimpleViewList';
import LibraryProvider from './context/LibraryContext';
import './App.css'

function App() {
  const sampleBooks = [
    {
      id: '0101',
      title: "Dialogues Concerning Two New Sciences",
      author: "Galileo Galilei",
      YearofPublication: "1638"
    },
    {
      id: '0102',
      title: "Sidereus Nuncius, or The Sidereal Messenger",
      author: "Galileo Galilei",
      YearofPublication: "1610"
    },
    {
      id: '0103',
      title: "A Very Lengthy Discourse on the Mechanics of Celestial Bodies and Their Movements Through the Heavens as Observed by Telescope",
      author: "Johannes Kepler",
      YearofPublication: "1621"
    },
    {
      id: '0104',
      title: "On the Revolutions of the Heavenly Spheres",
      author: "Nicolaus Copernicus",
      YearofPublication: "1543"
    },
    {
      id: '0105',
      title: "Principia: Mathematical Principles of Natural Philosophy and His System of the World",
      author: "Isaac Newton",
      YearofPublication: "1687"
    },
    {
      id: '0106',
      title: "Brief Introduction to the History of Science",
      author: "Maria Celeste Galilei",
      YearofPublication: "1633"
    },
    {
      id: '0107',
      title: "The Extremely Detailed and Comprehensive Analysis of Astronomical Observations Made Throughout the European Continent During the Renaissance Period with Particular Focus on the Mathematical Models Derived from Such Observations",
      author: "Tycho Brahe",
      YearofPublication: "1588"
    },
    {
      id: '0108',
      title: "Harmonices Mundi",
      author: "Johannes Kepler",
      YearofPublication: "1619"
    }
  ];
  return (
    <LibraryProvider>
      <div className='App'>
        <Routes>
            <Route path = "/" element = { <HomePage/>}/>
            <Route path="/library/page/:pageNumber" element={<LibraryPage />} />
            <Route path = "/book/:bookId" element = {<BookPage/>}/>
            <Route path="/advanced-search/page/:pageNumber" element={<AdvancedSearchPage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/test" element={<SimpleViewList books = {sampleBooks} />} />
        </Routes>
      </div>
    </LibraryProvider>
  );
}

export default App;