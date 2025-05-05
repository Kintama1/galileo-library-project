// utils/bookDataUtils.js - Updated version

/**
 * Extracts unique values for a specific property from an array of books
 * @param {Array} books - The array of books
 * @param {String} property - The property to extract values from
 * @param {Boolean} sort - Whether to sort the values (default: true)
 * @param {Boolean} numeric - Whether to sort numerically (default: false)
 * @returns {Array} - Array of unique values
 */
export const getUniqueValues = (books, property, sort = true, numeric = false) => {
  // Extract and filter unique values (ignore "Unknown" values)
  let uniqueValues = [...new Set(
    books
      .map(book => book[property])
      .filter(value => 
        value && 
        value.toString().trim() !== '' && 
        value !== 'Not provided'
      )
  )];
  
  // Convert to numbers if numeric sorting is requested
  if (numeric) {
    uniqueValues = uniqueValues.map(value => isNaN(Number(value)) ? value : Number(value));
  }
  
  // Sort values if requested
  if (sort) {
    if (numeric) {
      
      uniqueValues.sort((a, b) => a - b);
    } else {
      uniqueValues.sort();
    }
  }
  
  return uniqueValues;
};

/**
 * Creates formatted options for select inputs from book data
 * @param {Array} books - The array of books
 * @param {String} property - The property to extract values from
 * @param {String} allLabel - Label for the "All" option
 * @param {Boolean} numeric - Whether to sort numerically (default: false)
 * @returns {Array} - Array of option objects { value, label }
 */
export const createSelectOptions = (books, property, allLabel = null, numeric = false) => {
  const uniqueValues = getUniqueValues(books, property, true, numeric);
  
  const options = uniqueValues.map(value => ({
    value: value.toString(), // Convert back to string for consistent option values
    label: value.toString()
  }));
  
  // Add "All" option at the beginning
  options.unshift({ 
    value: 'all', 
    label: allLabel || `All ${property.charAt(0).toUpperCase() + property.slice(1)}s` 
  });
  
  return options;
};