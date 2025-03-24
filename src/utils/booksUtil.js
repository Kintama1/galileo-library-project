
import { processDimensions} from "./processing";

export function prepareBooks(rawBooksData) {
    const booksByID = {};
    const booksArray = [];
   
    
    rawBooksData.forEach(book => {

        const id = book.ID;
        const title = book.Title && book.Title.length >= 3 ? book.Title : 'Title Unknown';
        const { height, spineWidth } = processDimensions(book.Format);
        const simpleBook = {
            id: id,
            title : title,
            author : book.Author || 'Unknown Author',
            // later implement function based on page format
            height : height,
            spineWidth: spineWidth,
            editionType : book.Class || 'unspecified',
        };
        booksArray.push(simpleBook);

        const detailedBook = {};
        for (const key in book){
            const value = book[key];
            if (key === 'Title'){
                detailedBook['Title'] = title;
            }
            else if (value && value !== '""' && value.toString().trim() !== ' '){
                detailedBook[key] = value === '""' ? '' : value;
            }
            else {
                detailedBook[key] = 'Unknown';  
            }
        booksByID[id] = detailedBook;
        }
    });

    return {booksArray, booksByID}
}