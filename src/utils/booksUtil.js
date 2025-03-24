
import { processDimensions} from "./processing";

export function prepareBooks(rawBooksData) {
    const booksByID = {};
    rawBooksData.forEach(book => {

        const id = book.ID;
        const title = book.Title && book.Title.length >= 3 ? book.Title : 'Title Unknown';
        const { height, spineWidth } = processDimensions(book.Format);

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
        detailedBook['Height'] = height;
        detailedBook['SpineWidth'] = spineWidth;
        booksByID[id] = detailedBook;
        }
    });

    return {booksByID}
}