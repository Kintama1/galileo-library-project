import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Bookshelf from './components/Bookshelf/Bookshelf';
import HomePage from './components/Pages/HomePage';
import LibraryPage from './components/Pages/LibraryPage';
import BookPage from './components/Pages/BookPage';
import LibraryProvider from './context/LibraryContext';
import './App.css'

function App() {
  
  return (
    <LibraryProvider>
      <div className='App'>
        <Routes>
            <Route path = "/" element = { <HomePage/>}/>
            <Route path="/library/page/:pageNumber" element={<LibraryPage />} />
            <Route path = "/book/:bookId" element = {<BookPage/>}/>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </LibraryProvider>
  );
}

export default App;