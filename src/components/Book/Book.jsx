import React, {useState} from 'react';


import './Book.css';

function Book(props) {
    const [hovered, setHovered] = useState(false);
    const getEditionClass = () => {
        const editionType = props.editionType;
        
        if (editionType.includes('FirstKnownEdition')) return 'first-known';
        if (editionType.includes('KnownEdition')) return 'known';
        if (editionType.includes('manuscript')) return 'manuscript';
        if (editionType.includes('UnspecifiedEdition')) return 'unspecified';
        if (editionType.includes('multivol')) return 'multivol'
    };
    const editionClass = getEditionClass();
    function handleBookClick() {
        if (props.editionType.includes('multivol') && props.onClick) {
            // Call the provided onClick handler for multi-volumes
            props.onClick();
        } else {
            // For regular books, navigate to the book detail page
            console.log(`${props.id}`)
            window.open(`/book/${props.id || ''}`, '_blank');
        }
    }
    return (
        <div className="book-container"
        style={{
            '--book-height': props.height || '200px',
            '--spine-width': props.spineWidth || '60px',
            '--cover-width': '150px'
        }}
        onClick={handleBookClick}
        >
            <div 
                className={`book ${hovered ? 'hovered' : ''}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className='book-side book-top'></div>
                <div className={`book-side book-spine ${editionClass}`}>
                    <div className="spine-decoration"></div>
                    <div className="spine-decoration"></div>
                    <span className="book-title">{props.title}</span>
                    {props.volume && <span className='book-volume'> Vol{props.volume} </span>}

                </div>
                <div className={`book-side book-cover ${editionClass}`}>
                    <div className={`book-cover-title ${hovered ? 'hovered' : ''}`}>{props.title}</div>
                    <div className={`book-cover-author ${hovered ? 'hovered' : ''}`}>{props.author}</div> 
                </div>
            </div>
            <div className="book-shelf"
              
            ></div>
        </div>
    )
}
export default Book;