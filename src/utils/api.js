import axios from 'axios';


const SHEET_ID = '1nvMTnx_byDewaKDZCcbH9VUxYWqQ87BjgUtdZSZ3A68';
const TAB_NAME= 'sheet1';

export async function fetchBooksFromSheet() {
    try {
      // This URL format allows accessing a published Google Sheet as CSV
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${TAB_NAME}`;
      
      const response = await axios.get(url);  
     return parseCSVData(response.data);
      
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  }

  // Add this function to src/utils/api.js

  function parseCSVData(csvData) {
    // Split the CSV by newlines
    const rows = csvData.split('\n');
    
    // Extract header row and remove quotes
    const headers = rows[0].split(',').map(header => 
      header.replace(/^"(.+)"$/, '$1').trim()
    );
    
    // Parse all rows into book objects
    const allBooks = rows.slice(1).map(row => {
      // Split the row by commas (handling quoted values)
      const values = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
      
      // Create an object mapping headers to values in original order
      const bookEntries = headers.map((header, index) => {
        // Remove quotes from values
        const value = values[index] ? values[index].replace(/^"(.+)"$/, '$1').trim() : '';
        return [header, value];
      });
      
      // Convert entries to an object - preserves insertion order in modern JS
      return Object.fromEntries(bookEntries);
    });
    
    // Filter out books with invalid IDs
    const validBooks = allBooks.filter(book => {
      const id = book.ID;
      return id && id.trim() !== '' && /^\d{4}$/.test(id.replace(/"/g, ''));
    });
    
    return validBooks;
  }