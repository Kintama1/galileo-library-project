import React, { useEffect, createContext, useState, useContext, } from "react";
import { fetchBooksFromSheet } from "../utils/api";
import { prepareBooks } from "../utils/booksUtil";
import { generateFilterConfig } from "../utils/bookFilters";
const LibraryContext = createContext();

export default function LibraryProvider({children}) {
    const [booksArray, setBooksArray] = useState([]);
    const [booksById, setBooksByID] = useState({});
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null)

    const [filters, setFilters] = useState({
        yearFrom: '',
        yearTo: '',
        editionType: 'all',
        country: 'all',
        city: 'all',
        format: 'all',
    });

    const [filterConfig, setFilterConfig] = useState(null);
    useEffect(()=>{
        async function loadBooks(){
            try {
            
                const rawData = await fetchBooksFromSheet();
                const {booksArray, booksByID} = prepareBooks(rawData);
                setBooksArray(booksArray);
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
            editionType: 'all',
            city: 'all',
            format: 'all',
            country: 'all'
        });
    };
    const value = {
        booksArray,
        booksById,
        loading,
        error,
        filters,
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