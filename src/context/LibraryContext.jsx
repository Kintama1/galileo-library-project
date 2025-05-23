import React, { useEffect, createContext, useState, useContext, } from "react";
import { fetchBooksFromSheet, fetchColumnsFromSheet } from "../utils/api";
import { prepareBooks } from "../utils/booksUtil";
import { generateFilterConfig } from "../utils/bookFilters";
import useDebounce  from '../hooks/useDebounce.js';


const LibraryContext = createContext();

export default function LibraryProvider({children}) {
    const [booksById, setBooksByID] = useState({});
    const [columnExplanations, setColumnExplanations] = useState({});
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null)

    const [filters, setFilters] = useState({
        yearFrom: '',
        yearTo: '',
        class: 'all',
        country: 'all',
        city: 'all',
        format: 'all',
        sources:[]
    });
    const debouncedFilters = {
        yearFrom: useDebounce(filters.yearFrom, 500),
        yearTo: useDebounce(filters.yearTo, 500),
        class: filters.class,
        country: filters.country,
        city: filters.city,
        format: filters.format,
        sources : filters.sources
    };

    const [filterConfig, setFilterConfig] = useState(null);
    useEffect(() => {
        async function loadData() {
            try {
                // Constants for cache validation
                const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
                const now = Date.now();
                
                // Try to load books from cache first
                const cachedBooksTime = localStorage.getItem('booksDataTime');
                const cachedBooksData = localStorage.getItem('booksData');
                let booksData = null;
                
                // Check if we have valid cached book data
                if (cachedBooksData && cachedBooksTime && (now - parseInt(cachedBooksTime) < ONE_DAY)) {
                    // Use cached book data if less than 24 hours old
                    console.log('Using cached book data');
                    booksData = JSON.parse(cachedBooksData);
                    setBooksByID(booksData);
                } else {
                    // Fetch fresh book data if cache is old or doesn't exist
                    console.log('Fetching fresh book data');
                    const rawData = await fetchBooksFromSheet();
                    const { booksByID } = prepareBooks(rawData);
                    setBooksByID(booksByID);
                    
                    // Cache the fresh book data
                    localStorage.setItem('booksData', JSON.stringify(booksByID));
                    localStorage.setItem('booksDataTime', now.toString());
                    booksData = booksByID;
                }
                
                // Generate filter config based on the books (cached or fresh)
                setFilterConfig(generateFilterConfig(Object.values(booksData)));
                
                // Try to load column explanations from cache
                const cachedColumnsTime = localStorage.getItem('columnExplanationsTime');
                const cachedColumnsData = localStorage.getItem('columnExplanations');
                
                // Check if we have valid cached column explanations
                if (cachedColumnsData && cachedColumnsTime && (now - parseInt(cachedColumnsTime) < ONE_DAY)) {
                    // Use cached column explanations if less than 24 hours old
                    console.log('Using cached column explanations');
                    setColumnExplanations(JSON.parse(cachedColumnsData));
                } else {
                    // Fetch fresh column explanations if cache is old or doesn't exist
                    console.log('Fetching fresh column explanations');
                    const columnData = await fetchColumnsFromSheet();
                    setColumnExplanations(columnData);
                    
                    // Cache the fresh column explanations
                    localStorage.setItem('columnExplanations', JSON.stringify(columnData));
                    localStorage.setItem('columnExplanationsTime', now.toString());
                }
                
                setLoading(false);
            } catch(err) {
                // If we have cached data, use it as fallback
                const cachedBooksData = localStorage.getItem('booksData');
                const cachedColumnsData = localStorage.getItem('columnExplanations');
                
                if (cachedBooksData) {
                    const books = JSON.parse(cachedBooksData);
                    setBooksByID(books);
                    setFilterConfig(generateFilterConfig(Object.values(books)));
                }
                
                if (cachedColumnsData) {
                    setColumnExplanations(JSON.parse(cachedColumnsData));
                }
                
                setError(err.message);
                setLoading(false);
            }
        }
        
        loadData();
    }, []);
    
    // Add a function to manually clear the cache if needed
    const clearCache = () => {
        localStorage.removeItem('booksData');
        localStorage.removeItem('booksDataTime');
        localStorage.removeItem('columnExplanations');
        localStorage.removeItem('columnExplanationsTime');
        // Force reload the page to fetch fresh data
        window.location.reload();
    };


    const updateFilter = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const resetFilters = () => {
        setFilters({
            yearFrom: '',
            yearTo: '',
            class: 'all',
            city: 'all',
            format: 'all',
            country: 'all',
            sources: []
        });
    };
    const value = {
        booksById,
        columnExplanations,
        loading,
        error,
        filters,
        debouncedFilters,
        filterConfig,
        updateFilter,
        resetFilters
    };
    return (
        <LibraryContext.Provider value={value}>
            {children}
        </LibraryContext.Provider>
    );

}

export function useLibrary(){
    const context = useContext(LibraryContext);
    if (context === undefined){
        throw new Error( 'useLibrary must be used within Library context');
    }
    return context;
}