import axios from 'axios';


const SHEET_ID = '1yIVcA6TT4jpTiGXdvnr-KXGFZvJ8PE1V6Tz7rjNtqWI';
const COLUMNS_ID = '1w9IaVZ-5qAKMzsIlJ57H0IkjUR5MqJu2SHpNdk7I8k8';
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
  
export async function fetchColumnsFromSheet() {
  try {
    // This URL format allows accessing a published Google Sheet as CSV
    const url = `https://docs.google.com/spreadsheets/d/${COLUMNS_ID}/gviz/tq?tqx=out:csv&sheet=${TAB_NAME}`;
    
    const response = await axios.get(url);  
    return parseColumnExplanations(response.data);
    
  } catch (error) {
    console.error('Error fetching columns:', error);
    return {};
  }
}



  function parseColumnExplanations(csvData) {
  // Split the CSV by newlines
  const rows = csvData.split('\n');
  
  // Create an object to store column name -> explanation mappings
  const explanations = {};
  
  // Skip the header row (row 0) and process each data row
  for (let i = 1; i < rows.length; i++) {
    // Split each row into column name and explanation
    // This regex handles quoted CSV values properly
    const values = rows[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    
    if (values.length >= 2) {
      // Remove quotes from values
      const columnName = values[0].replace(/^"(.+)"$/, '$1').trim();
      const explanation = values[1].replace(/^"(.+)"$/, '$1').trim();
      
      // Add to our explanations object
      explanations[columnName] = explanation;
    }
  }
  
  return explanations;
}

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