// src/utils/api.test.js
import { fetchBooksFromSheet } from "./api";

test('seeing the data fetched from the api', async () => {
  // Call the function and wait for it to resolve
  const data = await fetchBooksFromSheet();
  
  // Log the actual data from the API
  console.log('Fetched data:', data);
  
  // Basic verification that data was received
  expect(data).toBeDefined();
  expect(Array.isArray(data)).toBe(true);
});