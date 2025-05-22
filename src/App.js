import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdvancedSearchPage from './components/Pages/AdvancedSearchPage'
import HomePage from './components/Pages/HomePage';
import LibraryPage from './components/Pages/LibraryPage';
import BookPage from './components/Pages/BookPage';
import LibraryProvider from './context/LibraryContext';
import UnderWorkPage from './components/Pages/UnderWorkPage';
import './App.css'

function App() {

  return (
    <LibraryProvider>
      <div className='App'>
        <Routes>
            <Route path = "/" element = { <HomePage/>}/>
            <Route path="/library/page/:pageNumber" element={<LibraryPage />} />
            <Route path = "/book/:bookId" element = {<BookPage/>}/>
            <Route path="/advanced-search/page/:pageNumber" element={<AdvancedSearchPage />} />
            <Route path="/contributors" element={<UnderWorkPage pageType="Contributors" />} />
            <Route path="/:pageType" element={<UnderWorkPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </LibraryProvider>
  );
}

export default App;