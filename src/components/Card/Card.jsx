import React from "react";
import './Card.css';

export default function Card({book}) {
    if (!book) return <div className="book-card-error"> Book not available</div>;
    
    const formatPropertyName = (name) => {
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase());
    }
    
    const bookProperties = Object.keys(book);

    return (
        <>
        <div className="title"><h2>Book ID: <span>{book.ID}</span></h2></div>
        <div className="card">
            {/* New Decorative Book Icon thanks claude! */}
            <div className="book-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4C4 2.89543 4.89543 2 6 2Z" stroke="var(--accent)" strokeWidth="1.5"/>
                    <path d="M12 2V22" stroke="var(--accent)" strokeWidth="1.5"/>
                    <path d="M7 7H9" stroke="var(--accent)" strokeWidth="1.5"/>
                    <path d="M15 7H17" stroke="var(--accent)" strokeWidth="1.5"/>
                    <path d="M7 12H9" stroke="var(--accent)" strokeWidth="1.5"/>
                    <path d="M15 12H17" stroke="var(--accent)" strokeWidth="1.5"/>
                </svg>
            </div>
            
            {book.Title && <h2 className="card-title">"{book.Title}"</h2>}
            
            <div className="relevant-info">
                {book.Author && 
                    <h3 className="info card-author">
                        <span className="property-name">Author: </span>
                        {book.Author}
                    </h3>
                }
                
                {(book.PlaceofPublication || book.Country) && (
                    <div className="info card-publication"> 
                        <h3>
                            <span className="property-name">Location: </span>
                            {book.PlaceofPublication && <span>{book.PlaceofPublication}</span>}
                            {book.PlaceofPublication && book.Country && <span>, </span>}
                            {book.Country && <span>{book.Country}</span>}
                        </h3>
                    </div>
                )}
                
                {book.YearofPublication && (
                    <div className="info year">
                        <h3>
                            <span className="property-name">Year: </span>
                            <span>{book.YearofPublication}</span>
                        </h3>
                    </div>
                )}
            </div>
            
            <div className="card-properties">
                {bookProperties.map(property => {
                    if (
                        !book[property] ||
                        property === 'Title' ||
                        property === 'Author' ||
                        property === 'YearofPublication' ||
                        property === 'PlaceofPublication' ||
                        property === 'ID' || 
                        property === 'Country'
                    ) {
                        return null;                
                    }
                    return (
                        <div key={property} className="card-property">
                            <span className="property-name">{formatPropertyName(property)}</span>
                            <span className="property-value">{book[property]}</span>
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    );
}