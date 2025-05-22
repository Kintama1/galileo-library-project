import React, { useEffect, createContext, useState, useContext, } from "react";
import { fetchBooksFromSheet } from "../utils/api";
import { prepareBooks } from "../utils/booksUtil";
import { generateFilterConfig } from "../utils/bookFilters";
import useDebounce  from '../hooks/useDebounce.js';


const LibraryContext = createContext();

export default function LibraryProvider({children}) {
    const [booksById, setBooksByID] = useState({});
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
    useEffect(()=>{
        async function loadBooks(){
            try {
            
                const rawData = await fetchBooksFromSheet();
                const {booksByID} = prepareBooks(rawData);
                setBooksByID(booksByID);
                setFilterConfig(generateFilterConfig(Object.values(booksByID)));
                setLoading(false);
            }
        
        catch(err) {
            setError(err.message);
            setLoading(false);

        }
    }
        loadBooks();
    },[])


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