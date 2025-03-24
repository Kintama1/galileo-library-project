export function processTitle(title) {
    if (title.length > 15) {
        return title.slice(0, 15) + "..."; // Added ellipsis for clarity
    } 
    else if (title.length < 3) {
        return `Title Unknown`;
    }
    else {
        return title; // Return the original title if it's not too long or empty
    }
}

export function processDimensions(format){
    var height;
    var spineWidth;

    switch (format){
        case "2":
            height = '270px';
            spineWidth = '90px'
        break;
        case "4":
            height = '250px';
            spineWidth = '70px'
        break;
        case "8":
            height = '220px';
            spineWidth = '70px'
        break;
        case "12":
            height = '200px';
            spineWidth = '60px'
        break;
        case "16":
            height = '190px';
            spineWidth = '50px'
        break;
        case "32":
            height = '170px';
            spineWidth = '45px'
        break;
        default:
            height = '200px';
            spineWidth = '55px'
        break;
    }
    return {height,spineWidth}

}