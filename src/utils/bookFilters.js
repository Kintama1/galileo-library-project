// utils/bookFilters.js
import { createSelectOptions,getUniqueValues } from "./bookDataUtils";




export const generateFilterConfig = (books) => {
  if (!books || books.length === 0) {
    return null;
  }
  return {
    yearRange: {
      type: 'range',
      name: 'year',
      title: 'Year of publication',
      min : Math.min(...getUniqueValues(books, 'YearofPublication').filter(year => !isNaN(Number(year)))),
      max : Math.max(...getUniqueValues(books, 'YearofPublication').filter(year => !isNaN(Number(year)))),
    },
    class: {
      type: 'select',
      name: 'class',
      title: 'Type of Material',
      options: createSelectOptions(books, 'Class', 'All Editions')
    },
    country: {
      type: 'select',
      name: 'country',
      title: 'Country',
      options: createSelectOptions(books, 'Country', 'All Countries')
    },
    city : {
      type: 'select',
      name: 'city', 
      title: 'City',
      options: createSelectOptions(books, 'PlaceofPublication', 'All Cities')
    },
    format: {
      type: 'select',
      name: 'format',
      title: 'Format',
      options: createSelectOptions(books, 'Format', 'All Formats', true)
    },  
    sources: {
      type: 'multiselect',
      name: 'sources',
      title: 'Source Collections',
      options: [
        { value: 'FavaroSource-Arch3483', label: 'Favaro Archive' },
        { value: 'FavaroSource-Gal308', label: 'Galileo Collection' },
        { value: 'FavaroSource-Palat1195', label: 'Palatine Collection' }
      ]
    }
  }; 
};

/**
 * Counts active filters from a filters object
 * @param {Object} filters - The filter criteria
 * @returns {Number} - Number of active filters
 */
export const countActiveFilters = (filters) => {
    if (!filters) return 0;
    
    let count = 0;
    
    if (filters.yearFrom) count++;
    if (filters.yearTo) count++;
    if (filters.author) count++;
    if (filters.class && filters.class !== 'all') count++;
    if (filters.country && filters.country !== 'all') count++;
    if (filters.publisher && filters.publisher !== 'all') count++;
    if (filters.placeOfPublication && filters.placeOfPublication !== 'all') count++;
    
    return count;
  };
  
  /**
   * Filters a list of books based on provided filter criteria
   * @param {Array} books - The array of books to filter
   * @param {Object} filters - The filter criteria
   * @returns {Array} - Filtered array of books
   */
  export const filterBooks = (books, filters) => {
    // If no filters provided or empty object, return all books
    if (!filters || Object.keys(filters).length === 0) {
      return books;
    }
    
    return books.filter(book => {
      if (Array.isArray(book)) {
        book = book[0];
      }
      // Author filter
      // Year range filter
      if (filters.yearFrom && book.YearofPublication && book.YearofPublication !== 'Not provided') {
        if (Number(book.YearofPublication) < Number(filters.yearFrom)) {
          return false;
        }
      }
      if (filters.yearTo && book.YearofPublication && book.YearofPublication !== 'Not provided') {
        if (Number(book.YearofPublication) > Number(filters.yearTo)) {
          return false;
        }
      }
      // Edition type/Class filter
  
      if (filters.class && filters.class !== 'all' && book.Class) {
        if (book.Class !== filters.class) {
          return false;
        }
      }
      
      // Country filter
      if (filters.country && filters.country !== 'all' && book.Country) {
        if (book.Country !== filters.country) {
          return false;
        }
      }

      // Place of publication filter
      if (filters.city && filters.city !== 'all' && book.PlaceofPublication) {
        if (book.PlaceofPublication !== filters.city) {
          return false;
        }
      }
      if (filters.format && filters.format !== 'all' && book.Format) {
        if (book.Format !== filters.format) {
          return false;
        }
      }
      if (filters.sources && Array.isArray(filters.sources) && filters.sources.length > 0) {
        const allSourcesPresent = filters.sources.every(source => {
          if (source === 'FavaroSource-Arch3483') {
            return book['FavaroSource-Arch3483'] === 'G';
          } else if (source === 'FavaroSource-Gal308') {
            return book['FavaroSource-Gal308'] === 'S';
          } else if (source === 'FavaroSource-Palat1195') {
            return book['FavaroSource-Palat1195'] === 'V';
          }
          return false;
        });
        
        if (!allSourcesPresent) {
          return false;
        }
      }
      
      // If book passed all filters, include it
      return true;
    });
  };